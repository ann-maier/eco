const pool = require('../../db-config/mysql-config');

const addPoint = (req, res) => {
  const { name, type, coordinates, description } = req.body;

  const query = `
  INSERT INTO poi 
  (Name, Type, Coord_Lat, Coord_Lng, Description, Name_object)
  VALUES ('${ name }', '${ type }', '${ coordinates[0] }', '${ coordinates[1] }', '${ description }', 'TEST_STRING');
  `;

  const pointPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, rows) => {
      if (error) {
        reject(error);
      }

      resolve();
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
