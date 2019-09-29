const pool = require('../../db-config/mysql-config');

const login = (req, res) => {
  const query = 'SELECT * FROM USERS';
  return pool.query(query, (error, rows) => {
    if (error) {
      throw error;
    }

    const response = rows[0] ? { success: true } : { success: false };

    return res.send(response);
  });
};


module.exports = {
  login
};
