const pool = require('../../db-config/mysql-config');

const getPoints = (req, res) => {
  const query = `
  SELECT 
    Id, Coord_Lat, Coord_Lng, Description
  FROM
    poi;
  `;

  const pointsPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, rows) => {
      if (error) {
        reject(error);
      }

      resolve(rows);
    });
  });

  return pointsPromise.then(points => {
    const response = points.map(({ Id, Coord_Lat, Coord_Lng, Description }) => {
      return {
        Id,
        coordinates: [Coord_Lat, Coord_Lng],
        Description
      };
    });

    res.send(response);
  }).catch(error => {
    res.status(500).send({
      message: error
    })
  });
};

module.exports = {
  getPoints
};
