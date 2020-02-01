const pool = require('../../db-config/mysql-config');

const tableName = 'gdk';

const getGdkElement = (req, res) => {
  const { code, environment } = req.body;

  const query = `
    SELECT 
      ??
    FROM 
      ??
    WHERE 
      ?? = ?
    AND
      ?? = ?
    ;`;

  const values = [['mpc_m_ot', 'mpc_avrg_d'], tableName, 'code', code, 'environment', environment];

  return pool.query(query, values, (error, rows) => {
    if (error) {
      return res.status(500).send({
        message: error
      });
    }

    const response = {
      average: rows[0].mpc_avrg_d,
      max: rows[0].mpc_m_ot,
    };

    return res.send(JSON.stringify(response));
  });
};

module.exports = {
  getGdkElement
};
