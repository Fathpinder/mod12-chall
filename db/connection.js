const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Lifebeforedeath1!',
        database: 'company'
    },
    console.log('Connected to the company database')
);

module.exports = db;