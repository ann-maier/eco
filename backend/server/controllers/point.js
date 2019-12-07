const pool = require('../../db-config/mysql-config');

const addPoint = (req, res) => {
  const { name, type, Coord_Lat, Coord_Lng, Description } = req.body;

  const query = `
  INSERT INTO poi 
  ('Name', 'Type', 'Coord_Lat', 'Coord_Lng', 'Description', 'Name_object')
  VALUES ('${ name }', '${ type }', '${ Coord_Lat }', '${ Coord_Lng }', '${ Description }, '123'');
  `;

  const pointPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, rows) => {
      if (error) {
        reject(error);
      }

      if (rows[0]) {
        resolve();
      }
    });
  });

  return pointPromise.then(() => {
    res.sendStatus(200);
  }).catch(error => {
    res.status(500).send({
      message: error
    })
  });
};

module.exports = {
  addPoint
};
