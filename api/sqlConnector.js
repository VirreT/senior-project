//require modules
require("dotenv").config();
const mysql = require("mysql2/promise");

// get Database connection details from .env
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000
});

/*
// connect the database
db.connect(err => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("MySQL connected!");
    }
});
*/
//export the db connection
module.exports = db;