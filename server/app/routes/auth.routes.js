const { checkDuplicateName, checkDuplicateEmail } = require("../middleware/verifySignUp.js")
const { signup, signin } = require("../controllers/auth.controller.js")
module.exports = function (app) {
  
  /**
   * SIGNUP ENDPOINT
   * @param {JSON Object} req.body - {
   *  "username": "username",
   *  "email": "email",
   *  "password": "password"
   * }
   * @param {JSON Object} res - result object
   */
  app.post("/api/auth/signup", [checkDuplicateName, checkDuplicateEmail], signup);

  /**
   * SIGNIN ENDPOINT
   * @param {JSON Object} req.body - {
   *  "username": "username",
   *  "email": "email",
   *  "password": "password"
   * }
   * @param {JSON Object} res - {
   *  "username": "username stored in db",
   *  "accessToken": "the jsonwebtoken for the users sign in session"
   * }
   */
  app.post("/api/auth/signin", signin);
};
