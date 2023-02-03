const { db } = require("../config/db.config");

/**
 * Get board controller
 * 
 * This controller finds a board in the db and returns it to
 *  the frontend. This is done by procedurally adding board 
 *  items (columns and tasks) to an object called boardObject.
 *  boardObject is returned to the frontend for rendering.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - identifiers of board being requested
 * @param {JSON Object} res - result object
 */
exports.getBoard = (req, res) => {
  // Declare board object to return
  let boardObject = {};
  boardObject.columns = [];
  boardObject.tasks = [];

  // Starting get transaction
  db.tx("getBoard-transaction", (t) => {
    // t = transaction instance

    // Find workspace id
    return t
      .one("SELECT workspace_id FROM workspaces WHERE owner_id = $1", [
        req.userID,
      ])
      .then((workspace) => {
        
        // Find board and insert into boardObject
        return t
          .one(
            "SELECT * FROM boards WHERE board_name = $1 AND workspace_id = $2",
            [req.body.boardName, workspace.workspace_id]
          )
          .then((board) => {
            boardObject.boardName = board.board_name;

            // Find columns
            return t
              .any("SELECT * FROM columns WHERE board_id = $1", [
                board.board_id,
              ])
              .then((columns) => {
                
                // Sort columns in placement order for boardObject
                columns.sort(function compare(a, b) {
                  return (a.column_placement - b.column_placement)
                })
                // Add columns to boardObject
                columns.map((column) => {
                  boardObject.columns.push({
                    name: column.column_name,
                    placement: column.column_placement,
                  });
                });

                // Find tasks
                const findTasks = columns.map((column) => {
                  return t.any("SELECT * FROM tasks WHERE column_id = $1", [
                    column.column_id,
                  ]);
                });

                // Batch results to resolve promises
                return t.batch(findTasks).then((allTasks) => {
                  // allTasks is a 2 dimensional array of the form [column[task]]

                  // Map over all tasks grouped by columns
                  allTasks.map((columnOfTasks) => {
                    
                    // Map over tasks in each column
                    columnOfTasks.map((task) => {
                      
                      // Add tasks to boardObject
                      boardObject.tasks.push({
                        name: task.task_name,
                        description: task.description,
                        placement: task.task_placement,
                        column: task.column_number,
                        color: task.color,
                      });
                    });
                  });
                });
              });
          });
      });
  })

    // Success
    .then(() => {
      console.log(JSON.stringify(boardObject));
      res.status(200).send(JSON.stringify(boardObject));
    })

    // Fail
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send({ message: `Could not find board: ${req.body.boardName}` });
    });
};

/**
 * Save board controller
 * 
 * This controller creates a new board with example columns and tasks.
 *  This is done by inserting entries into tables such as boards, 
 *  columns, and tasks. 
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - all data to be stored including: board data, column data, and task data
 * @param {JSON Object} res - result object
 */
exports.saveBoard = (req, res) => {

  // Starting save transaction
  db.tx("saveBoard-transaction", (t) => {
    // t = transaction instance

    // Find workspaceID
    return (
      t
        .one("SELECT workspace_id FROM workspaces WHERE owner_id = $1", [
          req.userID,
        ])
        .then((workspace) => {
          
          // Insert board into db
          return t
            .one(
              "INSERT INTO boards(board_name, workspace_id) VALUES($1, $2) RETURNING board_id",
              [req.body.boardName, workspace.workspace_id]
            )
            .then((board) => {
              
              // Map over columns and insert them into the db with board_id from previous query
              const col_queries = req.body.columns.map((col) => {
                return t.one(
                  "INSERT INTO columns(column_name, column_placement, board_id) VALUES($1, $2, $3) RETURNING column_id",
                  [col.name, col.placement, board.board_id]
                );
              });

              // Batch results from map queries to resolve promises
              return t.batch(col_queries).then((col_ids) => {
                
                // Map over tasks and insert them into the db with column_ids from previous queries
                const task_queries = req.body.tasks.map((task) => {
                  return t.none(
                    "INSERT INTO tasks(task_name, description, task_placement, color, creator_id, column_id, column_number) VALUES($1, $2, $3, $4, $5, $6, $7)",
                    [
                      task.name,
                      task.description,
                      task.placement,
                      task.color,
                      req.userID,
                      col_ids[task.column - 1].column_id,
                      task.column,
                    ]
                  );
                });

                // Batch results to resolve promises
                return t.batch(task_queries);
              });
            });
        })

        // Success
        .then((data) => {
          console.log("transaction succesful ", data);
          res.status(200).send({ message: "Board saved succesfully" });
        })

        // Fail
        .catch((err) => {
          console.log(err)
          res.status(500).send({message: "Server error"})
        })
    );
  });
};

/**
 * Update board controller
 * 
 * This controller updates the title of a board. This is done with a simple
 *  update sql query.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - identifiers to locate requested board and changed content
 * @param {JSON Object} res - result object
 */
exports.updateBoard = (req, res) => {
  
  // Start update board transaction
  db.tx("updateBoard-transaction", (t) => {
    
    // Find workspace id
    return t.one('SELECT * FROM workspaces WHERE owner_id = $1', [req.userID])
      .then(workspace => {
        
        // Update board name
        return t.none('UPDATE boards SET board_name = $1 WHERE workspace_id = $2 AND board_name = $3', [req.body.newBoardName, workspace.workspace_id, req.body.boardName])
      })
  })

  // Success
  .then(() => {
    res.status(200).send({message: "Board updated"})
  })

  // Fail
  .catch(err => {
    console.log(err)
    res.status(500).send({message: "server error"})
  })
}

/**
 * Delete board controller
 * 
 * This controller deletes boards from the db. This is done by 
 *  following foreign keys until the function gets to the tasks 
 *  of the board. It then deletes all tasks, then all columns, 
 *  and lastly the board entry itself from the db.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - identifiers to locate requested board including: boardName, and workspaceID (temporary)
 * @param {JSON Object} res - result object
 */
exports.deleteBoard = (req, res) => {
  let board_id; // Initialize global board_id
  let columns = []; // Initialize column id array

  // Starting delete transaction
  db.tx("deleteBoard-transaction", (t) => {
    // t = transaction instance

    // Find workspaceID
    return t
      .one("SELECT workspace_id FROM workspaces WHERE owner_id = $1", [
        req.userID,
      ])
      .then((workspace) => {
        
        // Finding board id
        return t
          .one(
            "SELECT board_id FROM boards WHERE board_name = $1 AND workspace_id = $2",
            [req.body.boardName, workspace.workspace_id]
          )
          .then((result) => {
            
            // Set board_id
            board_id = result.board_id;

            // Find columns that match board_id
            return t
              .any("SELECT column_id FROM columns WHERE board_id = $1", [
                board_id,
              ])
              .then((result) => {
                
                // Fill the column id array with result from above query
                result.map((x) => {
                  columns.push(x.column_id);
                });

                // Map over column id array and delete any TASK associated with an id in the array
                const deleteTasks = columns.map((col) => {
                  return t.any(
                    "DELETE FROM tasks WHERE column_id = $1 RETURNING *",
                    [col]
                  );
                });

                // Batch results from task deletion to resolve promises
                return t.batch(deleteTasks).then((x) => {
                  
                  // Map over column id array and delete the COLUMNS associated with ids in the array
                  const deleteColumns = columns.map((col) => {
                    return t.none("DELETE FROM columns WHERE column_id = $1", [
                      col,
                    ]);
                  });

                  // Batch results
                  return t.batch(deleteColumns).then((y) => {
                    
                    // Finally, delete the board
                    return t.none("DELETE FROM boards WHERE board_id = $1", [
                      board_id,
                    ]);
                  });
                });
              });
          });
      });
  })
    // Success
    .then((data) => {
      console.log("deletion succesful ", data);
      res.status(200).send({ message: "Board deleted succesfully" });
    })

    // Fail
    .catch((err) => {
      console.log(err)
      res.status(500).send({message: " Server error"})
    });
};
