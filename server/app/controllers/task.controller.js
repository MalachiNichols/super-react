const { json } = require("stream/consumers");
const { db } = require("../config/db.config");

/**
 * Create task controller
 * 
 * This controller creates a new task in the db. This is 
 *  done via an INSERT query directed at the tasks table.
 * 
 * @param {JSON Object} req - http request data
 * @param {string} req.userID - ID of requesting user passed from middleware
 * @param {JSON Object} req.body - identifiers to locate column and new content
 * @param {JSON Object} res - result object
 */
exports.createTask = (req, res) => {
    let task = req.body.task
    db.tx('createTask-transaction', (t) => {
        
        // Find workspace id
        return t.one('SELECT * FROM workspaces WHERE owner_id = $1', [req.userID])
        .then(workspace => {
            
            // Find board_id
            return t.one('SELECT * FROM boards WHERE board_name = $1 AND workspace_id = $2', [req.body.boardName, workspace.workspace_id])
            .then(board => {
                
                // Find column id (before change)
                return t.one('SELECT * FROM columns WHERE column_placement = $1 AND board_id = $2', [task.column, board.board_id])
                .then(column => {
                    
                    // Insert task into db
                    return t.none(`INSERT INTO tasks (task_name, description, task_placement, color, creator_id, column_id, column_number)
                                  VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                                  [task.name, task.description, task.placement, task.color, req.userID, column.column_id, task.column])
                })
            })
        })
    })

    // Success
    .then(() => {
        res.status(200).send({message: "Succesfully created task"})
    })

    // Fail
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Server error"})
    })
}

/**
 * Update task controller
 * 
 * This controller updates the content of a task in the db. This is done
 *  by first checking if the task has moved to a different column. If it 
 *  has, then any task affected by the move are adjusted and the task is 
 *  updated. If it does not, the task is simply updated.
 * 
 * @param {JSON Object} req - http request data
 * @param {string} req.userID - ID of requesting user passed from middleware
 * @param {JSON Object} req.body - identifiers to locate requested task and changed content
 * @param {JSON Object} res - result object
 */
exports.updateTask = (req, res) => {
    let newTask = req.body.changedTask
    
    // Start update task transaction
    db.tx('updateTask-transaction', (t) => {
        
        // Find workspace id
        return t.one('SELECT * FROM workspaces WHERE owner_id = $1', [req.userID])
        .then(workspace => {
            
            // Find board_id
            return t.one('SELECT * FROM boards WHERE board_name = $1 AND workspace_id = $2', [req.body.boardName, workspace.workspace_id])
            .then(board => {
                
                // Find column id (before change)
                return t.one('SELECT * FROM columns WHERE column_placement = $1 AND board_id = $2', [req.body.task.column, board.board_id])
                .then(column => {
                    
                    // Check if task has moved to a different column
                    if(req.body.task.column !== newTask.column) {
                        // Task moved to new column
                        
                        // Find id of new column
                        return t.one('SELECT * FROM columns WHERE column_placement = $1 AND board_id = $2', [req.body.changedTask.column, board.board_id])
                        .then(changeColumn => {
                            
                            // Increment placement of tasks in new column >= placement of changed task within new column
                            return t.none('UPDATE tasks SET task_placement = task_placement + 1 WHERE column_id = $1 AND task_placement >= $2', [changeColumn.column_id, newTask.placement])
                            .then((result) => {
                                
                                // Update the task info including new column info
                                return t.none('UPDATE tasks SET task_name = $1, description = $2, task_placement = $3, color = $4, column_id = $5, column_number = $6 WHERE column_id = $7 AND task_placement = $8',
                                [newTask.name, newTask.description, newTask.placement, newTask.color, changeColumn.column_id, changeColumn.column_placement, column.column_id, req.body.task.placement])
                                .then((result) => {
                                    
                                    // Decrement placement of other tasks in original column > placement of task before it was changed
                                    return t.none('UPDATE tasks SET task_placement = task_placement - 1 WHERE column_id = $1 AND task_placement > $2', [column.column_id, req.body.task.placement])
                                })
                            })
                        })
                    } else {
                        // Task did not move to new column
                        
                        // Update task info
                        return t.none('UPDATE tasks SET task_name = $1, description = $2, task_placement = $3, color = $4 WHERE column_id = $5 AND task_placement = $6',
                        [newTask.name, newTask.description, newTask.placement, newTask.color, column.column_id, req.body.task.placement])
                    }
                })
            })
        })
    })

    // Success
    .then(() => {
        res.status(200).send({message: "Succesfully updated task"})
    })

    // Fail
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Server error"})
    })
}

/**
 * Delete task controller
 * 
 * This controller deletes a task from the db. This is done
 *  via a simple DELETE query and then any other tasks affected 
 *  by the deletion are updated accordingly.
 * 
 * @param {JSON Object} req - http request data
 * @param {string} req.userID - ID of requesting user passed from middleware
 * @param {JSON Object} req.body - identifiers to locate requested task to be deleted
 * @param {JSON Object} res - result object
 */
exports.deleteTask = (req, res) => {
    
    // Begin delete task endpoint
    db.tx('deleteTask-transaction', (t) => {
        // Find workspace id
        return t.one('SELECT * FROM workspaces WHERE owner_id = $1', [req.userID])
        .then(workspace => {
            
            // Find board id
            return t.one("SELECT * FROM boards WHERE board_name = $1 AND workspace_id = $2", [req.body.boardName, workspace.workspace_id])
            .then(board => {
                
                // Find column id
                return t.one("SELECT * FROM columns WHERE board_id = $1 AND column_placement = $2", [board.board_id, req.body.task.column])
                .then(column => {
                    
                    // Delete task from db
                    return t.none('DELETE FROM tasks WHERE column_id = $1 AND task_placement = $2', [column.column_id, req.body.task.placement])
                    .then(() => {

                        // Decrement placement of tasks after deleted task
                        return t.none('UPDATE tasks SET task_placement = task_placement - 1 WHERE column_id = $1 AND task_placement > $2', [column.column_id, req.body.task.placement])
                    })
                })
            })
        })
    })
    // Success
    .then(() => {
        res.status(200).send({message: "Succesfully deleted task"})
    })

    // Fail
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "Server error"})
    })
}