const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Anton2005',
  database: 'KEEM'
});

module.exports = pool;