const { TOKEN_SECRET } = require("../config/env.config");
const jwt = require("jsonwebtoken");

/**
 * Verify user access token
 * 
 * This middleware checks the validity of the provided 
 *  accessToken. If checks pass, the userID is added to
 *  req and passed to the controllers.
 * 
 * @param {JSON Object} req - http request data
 * @param {string} req.headers.authorization - encoded jwt prefixed with "Bearer" identifier
 * @param {JSON Object} res - result object
 * @param {Object} next - express middleware callback argument
 */
exports.verifyUserToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(authHeader) {
        // Extract token from authorization header
        const token = authHeader.split(' ')[1]

        // Validate token against secret key
        jwt.verify(token, TOKEN_SECRET, function (err, user) {
            
            // Validation failed
            if(err) {
                console.log(err)
                return res.status(401).send({message: "User not signed in."})
            }

            // Validation succesful
            req.userID = user.id      // this id is the serial id of the user in the db
            next()
        })
    } else {
        
        // No authorization headers
        res.status(401).send({message: "User not signed in."})
    }
}
