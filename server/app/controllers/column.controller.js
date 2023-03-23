const { db } = require("../config/db.config");


/**
 * Add Column controller
 * 
 * This controller adds new columns to a board in the db. This
 *  is done with an INSERT query directed at the columns table.
 *  Note that columns can only be added to the end of the board.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - identifiers to locate board and new column content
 * @param {JSON Object} res - result object
 */

// // CREATE- INSERT
exports.addColumn = (req, res) => {
    // Executes a callback function as a transaction, with automatically managed connection.
      db.tx('addColumn-transaction', t => {
        // t = transaction instance
       
        // find workspace_id that has owner_id
        return t.one(
            `
            SELECT 
                workspace_id 
            FROM 
                workspaces 
            WHERE 
                owner_id = $1`, [req.userID]) //injects value into query where $1
    
        .then((workspace) => {
            //find board_id where you have board_name && workspace_id 
            return t.one(
                `
                SELECT 
                    board_id 
                FROM 
                    boards 
                WHERE 
                    board_name = $1 
                    AND 
                    workspace_id = $2`, [req.body.boardName, workspace.workspace_id]
              )
    
        .then((board) => {
    
                //Returns: A promise object with the result from the callback function.
            return t.one(
              // Insert column into db
                  `
                  INSERT 
                  INTO columns(
                    column_name, 
                    column_placement, 
                    board_id) 
                    VALUES($1,
                    (
                    SELECT 
                        coalesce(max(column_placement) + 1, 0)
                    FROM 
                        columns
                    WHERE 
                        board_id = $2
                    ), $2) 
                    RETURNING 
                        column_id`, [req.body.column.name, board.board_id])
          })
        })
      })
         // SUCCESS
        .then(data => {
          res.status(200).json({message:'column added successfully'})
        })
        // FAIL
        .catch(error => {
          return res.status(500).json({message: error.message ? error : 'Something went wrong'})
      })
    };
    
/**
 * Update Column controller
 * 
 * This controller updates the content of a column in the db.
 *  This is done with an update query, and if the column 
 *  moves position, the positions of other affected columns
 *  is also updated accordingly.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - identifiers to locate board and changed column content
 * @param {JSON Object} res - result object
 */
exports.updateColumn = (req, res) => {
    
    let newCol = req.body.newColumn
    let col = req.body.column

    db.tx('updateColumn-transaction', (t) => {
        
        // Find workspace id
        return t.one('SELECT * FROM workspaces WHERE owner_id = $1', [req.userID])
        .then(workspace => {
            
            // Find board id
            return t.one("SELECT * FROM boards WHERE board_name = $1 AND workspace_id = $2", [req.body.boardName, workspace.workspace_id])
            .then(board => {

                // Update column here
                return t.one(`UPDATE columns SET column_name = $1, column_placement = $2 
                              WHERE board_id = $3 AND column_placement = $4 RETURNING *`, 
                              [newCol.name, newCol.placement, board.board_id, col.placement])
                .then((column) => {

                    // Check if column moved to the right
                    if(col.placement > newCol.placement) {

                        // Update columns that WERE lesser but are now greater (i.e. column moved right)
                        return t.none(`UPDATE columns SET column_placement = column_placement + 1 
                             WHERE board_id = $1 AND column_placement < $2 AND column_placement >= $3 AND column_id != $4`,
                             [board.board_id, col.placement, newCol.placement, column.column_id])
                    
                    // Check if column moved to the left
                    } else if(col.placement < newCol.placement){

                        // Update columns that WERE greater but are now lesser (i.e. column moved left)
                        return t.none(`UPDATE columns SET column_placement = column_placement - 1 
                             WHERE board_id = $1 AND column_placement > $2 AND column_placement <= $3 AND column_id != $4`,
                             [board.board_id, col.placement, newCol.placement, column.column_id])  
                    } 
                })
                    
            })
        })
    })
    // Success
    .then(() => {
        res.status(200).send({message: "Succesfully updated column"})
    })

    // Fail
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Server error"})
    })
}

/**
 * Delete Column controller
 * 
 * This controller deletes a column in the db. This is done
 *  by first deleting the tasks inside the column, then
 *  the column itself is deleted. Afterwards, any columns 
 *  affected by the deletion are adjusted accordingly.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - identifiers to locate board and changed column content
 * @param {JSON Object} res - result object
 */
exports.deleteColumn = (req, res) => {
    
    // Begin delete column transaction
    db.tx('deleteColumn-transaction', (t) => {
        
        // Find workspace id
        return t.one(
            `
            SELECT 
                *
            FROM 
                workspaces 
            WHERE 
                owner_id = $1`, [req.userID])

        .then(workspace => {
            
            // Find board id
            return t.one(
                `SELECT 
                    * 
                FROM 
                    boards 
                WHERE 
                    workspace_id = $1 
                AND 
                    board_name = $2`, [workspace.workspace_id, req.body.boardName])

        .then(board => {
                
            // Find column id
            return t.one(
                `
                SELECT 
                    * 
                FROM 
                    columns 
                WHERE 
                    board_id = $1 
                AND 
                    column_placement = $2`, [board.board_id, req.body.column.placement])

        .then(column => {
                    
            // Delete every task in column
            return t.none(
                `
                DELETE 
                FROM 
                    tasks
                WHERE 
                    column_id = $1`, [column.column_id])
        .then(() => {
                        
            // Delete the column
            return t.none(
                `
                DELETE 
                FROM 
                    columns 
                WHERE 
                    column_id = $1`, [column.column_id])

        .then(() => {
                            
            // Decrement placement of columns that came after the deleted column
            return t.any(
                `
                UPDATE 
                    columns 
                SET 
                    column_placement = column_placement - 1 
                WHERE 
                    board_id = $1 
                AND 
                    column_placement > $2 
                RETURNING 
                    column_id`, [board.board_id, req.body.column.placement])
            
        .then(columnList => {
            // For every task in columns after the deleted column, update the column_number field 
            const updateColumnNumbers = columnList.map(column => {
            return t.any(
                `
                UPDATE 
                    tasks 
                SET 
                    column_number = column_number - 1 
                WHERE 
                    column_id = $1 
                Returning 
                    task_id`, [column.column_id])
                })
            // Batch result to resolve promises
                return t.batch(updateColumnNumbers)
                            })
                        })
                    })
                })
            })
        })
    })

    // Success
    .then(() => {
        res.status(200).send({message: "Succesfully deleted column"})
    })

    // Fail
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Server error"})
    })
}

