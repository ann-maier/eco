const pool = require('../../db-config/mysql-config');

const login = (req, res) => {
  const { login, password } = req.body;

  const query = `SELECT * FROM user WHERE user_name = '${ login }' AND password = '${ password }';`;

  return pool.query(query, (error, rows) => {
    if (error) {
      throw error;
    }

    const response = rows[0] ? { success: true } : { success: false };

    return res.send(JSON.stringify(response));
  });
};


module.exports = {
  login
};
