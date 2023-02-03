const { getBoard, saveBoard, updateBoard, deleteBoard } = require('../controllers/board.controller')
const { verifyUserToken } = require('../middleware/verifyUser')

module.exports = function (app) {
    
    /**
     * GET BOARD ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board"
     * }
     * @param {JSON Object} res - result object 
     */
    app.post('/api/boards/get', verifyUserToken, getBoard)

    /**
     * SAVE BOARD ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "columns": "[{"name": "name of column", "placement": "position of column within board"}, {...}]",
     *  "tasks": "[{
     *    "name": "name of task",
     *    "description": "description of task",
     *    "placement": position of task within column,
     *    "column": "which column the task is placed in (left to right 1-indexed)",
     *    "color": "color of the task"
     *  }, {...}]", 
     * }  
     * @param {JSON Object} res - result object  
     */
    app.post('/api/boards/save', verifyUserToken, saveBoard)

    /**
     * UPDATE BOARD ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "newBoardName": "new name of the board"
     * }
     * @param {JSON Object} res - result object 
     */
    app.patch('/api/boards/update', verifyUserToken, updateBoard)
    
    /**
     * DELETE BOARD ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of the board to delete",
     * } 
     * @param {JSON Object} res - result object
     */
    app.delete('/api/boards/delete', verifyUserToken, deleteBoard)
}