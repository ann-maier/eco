const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'remotemysql.com',
  user: 'TuDREFK7z3',
  password: 'xHpEQcXUdZ',
  database: 'TuDREFK7z3'
});

module.exports = pool;
