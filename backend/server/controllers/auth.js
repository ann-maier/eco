const pool = require('../../db-config/mysql-config');

const login = (req, res) => {
  const { login, password } = req.body;

  const query = `
  SELECT 
   ??,
    (SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?) as id_of_user
  FROM 
    ??
  WHERE ?? =
  (SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?);
  `;

  const values = [
    ['expert_name', 'id_of_expert', 'expert_FIO'],
    'id_of_user',
    'user',
    'user_name',
    login,
    'password',
    password,
    'expert',
    'id_of_expert',
    'id_of_expert',
    'user',
    'user_name',
    login,
    'password',
    password,
  ];

  return pool.query(query, values, (error, rows) => {
    if (error) {
      return res.status(500).send({
        message: error,
      });
    }

    const response = {
      expert_name: rows[0].expert_name,
      id_of_expert: rows[0].id_of_expert,
      FIO: rows[0].expert_FIO,
      id_of_user: rows[0].id_of_user,
    };

    return res.send(JSON.stringify(response));
  });
};

module.exports = {
  login,
};
