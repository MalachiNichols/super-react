const { createTask, updateTask, deleteTask } = require('../controllers/task.controller')
const { verifyUserToken } = require('../middleware/verifyUser')

module.exports = function (app) {    
    /**
     * CREATE TASK ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "task": "{
     *    "name": "name of changed task",
     *    "description": "description of changed task",
     *    "column": "which column the task is placed in (left to right 1-indexed)",
     *    "color": "color of the task",
     *    "placement": "vertical placement of task 1-indexed"
     *   }
     * }
     * @param {JSON Object} res - result object 
     */
    app.post('/api/tasks/create', verifyUserToken, createTask)

    /**
     * UPDATE TASK ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "task": {
     *    "placement": "position of the task within the column before change",
     *    "column": "which column the task was placed in before change (left to right 1-indexed)"
     * }
     *  "changedTask": "{
     *    "name": "name of changed task",
     *    "description": "description of changed task",
     *    "placement": "position of task within column",
     *    "column": "which column the task is placed in (left to right 1-indexed)",
     *    "color": "color of the task"
     *   }
     * }
     * @param {JSON Object} res - result object 
     */
    app.patch('/api/tasks/update', verifyUserToken, updateTask)
    
    /**
     * DELETE TASK ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "task": {
     *    "placement": "position of the task within the column",
     *    "column": "which column the task is in (left to right 1-indexed)"
     *  }
     * }
     * @param {JSON Object} res - result object 
     */
    app.delete('/api/tasks/delete', verifyUserToken, deleteTask)

}