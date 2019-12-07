const pool = require('../../db-config/mysql-config');

const getPoints = (req, res) => {
  const query = `
  SELECT 
    poi.Id,
    poi.Coord_Lat,
    poi.Coord_Lng,
    poi.Description,
    type_of_object.Name,
    type_of_object.Image
  FROM
    poi
  INNER JOIN type_of_object ON poi.Type = type_of_object.id;
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
    const response = points.map(({ Id, Coord_Lat, Coord_Lng, Description, Name, Image }) => {

      return {
        Id,
        coordinates: [Coord_Lat, Coord_Lng],
        Description,
        Name,
        Image,
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
