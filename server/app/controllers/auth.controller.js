const { db } = require("../config/db.config");
const { TOKEN_SECRET } = require("../config/env.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Register new user
 * 
 * This controller registers users into the db. This is done by
 *  hashing user passwords and inserting the username, email, 
 *  and hashed passwords into the users table of the db
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - new user credentials
 * @param {JSON Object} res - result object
 */
exports.signup = (req, res) => {

  sampleData = {
    boardName: 'Your 1st Board',
    columns: ['Backlog', 'In Progress', 'Peer Review', 'In Test', 'Done']
  }
  
  // Hash user password
  let hash = bcrypt.hashSync(req.body.password, 8);

  // Begin signup transaction
  db.tx('signup-transaction', (t) =>{
    
    // Create user
    return t.one(
      `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id`, [req.body.username, req.body.email, hash]
    )
    .then((user) => {
      
      // Create workspace
      return t.one('INSERT INTO workspaces(owner_id) VALUES ($1) RETURNING workspace_id', [user.id])
      .then(workspace => {
        // Insert board into db
        return t
        .one(
          "INSERT INTO boards(board_name, workspace_id) VALUES($1, $2) RETURNING board_id",
          [sampleData.boardName, workspace.workspace_id]
        )
        .then((board) => {
          
          // Map over columns and insert them into the db with board_id from previous query
          let i = 0
          const col_queries = sampleData.columns.map((col) => {
            i++
            return t.one(
              "INSERT INTO columns(column_name, column_placement, board_id) VALUES($1, $2, $3) RETURNING column_id",
              [col, i, board.board_id]
            );
          });

          // Batch results from map queries to resolve promises
          return t.batch(col_queries)
          // .then((col_ids) => {
            
          //   // Map over tasks and insert them into the db with column_ids from previous queries
          //   const task_queries = req.body.tasks.map((task) => {
          //     return t.none(
          //       "INSERT INTO tasks(task_name, description, task_placement, color, creator_id, column_id, column_number) VALUES($1, $2, $3, $4, $5, $6, $7)",
          //       [
          //         task.name,
          //         task.description,
          //         task.placement,
          //         task.color,
          //         req.userID,
          //         col_ids[task.column - 1].column_id,
          //         task.column,
          //       ]
          //     );
          //   });

          //   // Batch results to resolve promises
          //   return t.batch(task_queries);
          // });
        });
      })
    })
  })
  .then((result) => {
    
    // Succesful insertion
    res.status(200).send({ message: "User was registered succesfully." });
  })
  .catch((err) => {

    // Something went wrong
    res.status(500).send({ message: "Internal server error " + err.message });
  });
};

/**
 * Sign in user
 * 
 * This controller attempt to sign a user into the app. This is done by 
 *  first checking to see if the requested user exists in the db. Then, 
 *  if the user does exist, the function checks whether the provided email
 *  and password match the ones found in the db. After all checks are passed,
 *  a jsonwebtoken is encoded and returned to the frontend.
 * 
 * @param {JSON Object} req - http request data
 * @param {JSON Object} req.body - login credentials
 * @param {JSON Object} res - result object
 * @param {string} res.accessToken - jsonwebtoken for user sign in session
 */
exports.signin = (req, res) => {
  // find user
  db.any(`SELECT * FROM users WHERE name = $1`, [req.body.username])
    .then((user) => {
      
      // if no user return 404
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // check email against db
      if(user[0].email !== req.body.email) {
        return res.status(403).send({ message: "Incorrect Email Address."})
      }

      // check password against db
      let passwordIsCorrect = bcrypt.compareSync(
        req.body.password,
        user[0].password
      );

      // if wrong password return 401
      if (!passwordIsCorrect) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      // credentials match 
      // spawn access token
      let token = jwt.sign({ id: `${user[0].id}` }, TOKEN_SECRET, { expiresIn: 86400 });

      // user succesfully signed in
      return res.status(200).send({
        username: user[0].name,
        accessToken: token,
      });
    })
    .catch((err) => {

      // something went wrong
      res.status(500).send({ message: "Internal server error " + err.stack });
    });
};
