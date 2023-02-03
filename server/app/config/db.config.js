
/*
 * Connect to pg db
 */

const pgp = require("pg-promise")();

const { DB_URL, DB_PORT, DB_NAME, DB_USERNAME, DB_PASS } = require('./env.config')

// form credentials object
const connectionObject = {
    host: DB_URL,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASS
}

// spawn pg client connection handle
const db = pgp(connectionObject)
    
module.exports = {db, pgp}