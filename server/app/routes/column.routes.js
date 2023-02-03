const { addColumn, updateColumn, deleteColumn } = require('../controllers/column.controller')
const { verifyUserToken } = require('../middleware/verifyUser')

module.exports = function (app) {
    /**
     * ADD COLUMN ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "column": {
     *    "name": "name of new column"
     *  }
     * }
     * @param {JSON Object} res - result object 
     */
    app.post('/api/columns/add', verifyUserToken, addColumn)

    /**
     * UPDATE COLUMN ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "column": {
     *    "placement": "placement of column in board left to right 1-indexed"
     *  }
     *  "newColumn": {
     *    "name": "name of new column",
     *    "placement": "placement of new column in board left to right 1-indexed"
     *  }
     * }
     * @param {JSON Object} res - result object 
     */
    app.patch('/api/columns/update', verifyUserToken, updateColumn)

    /**
     * DELETE COLUMN ENDPOINT
     * @param {JSON Object} req.headers - HTTP header data
     * @param {string} req.headers.authorization - access token prefixed with "Bearer" keyword
     *                                             form: "Bearer access-token-here"
     * @param {JSON Object} req.body - {
     *  "boardName": "name of board",
     *  "column": {
     *    "placement": "position of column within board (left to right 1-indexed)",
     *  }
     * }
     * @param {JSON Object} res - result object 
     */
    app.delete('/api/columns/delete', verifyUserToken, deleteColumn)
}