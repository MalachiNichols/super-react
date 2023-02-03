require('dotenv').config()

module.exports = {
    version: '0.0.2',
    SERVER_PORT: process.env.SERVER_PORT,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PORT: process.env.DB_PORT,
    DB_PASS: process.env.DB_PASS,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}

