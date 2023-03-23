const { db } = require("../config/db.config"); // import db connection instance

/**
 * Check for duplicate username
 * 
 * This middleware checke the db to see if the 
 *  provided username already exists.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - new user credentials
 * @param {JSON Object} res - result object
 * @param {Object} next - express middleware callback argument
 */
exports.checkDuplicateName = (req, res, next) => {
  db.any(`SELECT name FROM users WHERE name = $1`, [req.body.username])
    .then(user => {
      if(user.length) {
        
        // username already exists
        return res.status(400).send({ message: "Username is already in use." });
      } else {
        
        // username doesn't exist yet
        next();
      }
    })
    .catch(err => console.log("checkDupliName error: ", err))

  
}

/**
 * Check for duplicate email
 * 
 * This middleware checks the db to see if the provided
 *  email already exists.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - new user credentials
 * @param {JSON Object} res - result object
 * @param {Object} next - express middleware callback argument
 */
exports.checkDuplicateEmail = (req, res, next) => {
  db.any(`SELECT email FROM users WHERE email = $1`, [req.body.email])
    .then(user => {
      if(user.length) {

        // email already exists
        return res.status(400).send({ message: "Email is already in use." });
      } else {
        // email doesn't exist yet
        next();
      }
    })
    .catch(err => console.log("checkDupliEmail error: ", err))


};