const pool = require('../../db-config/mysql-config');

const iconsMap = require('../utils/iconsMap');

const getPoints = (req, res) => {
  const query = `
  SELECT 
    poi.Id,
    poi.Coord_Lat,
    poi.Coord_Lng,
    poi.Description,
    poi.name,
    poi.Type,
    type_of_object.Name as Object_Type_Name
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
    const response = points.map(({ Id, Type, Coord_Lat, Coord_Lng, Description, name, Object_Type_Name }) => {
      return {
        Id,
        coordinates: [Coord_Lat, Coord_Lng],
        Description,
        name,
        Image: iconsMap.get(+Type),
        Object_Type_Name
      };
    });
    res.send(response);
  }).catch(error => {
    console.log(error);
    res.status(500).send({
      message: error
    })
  });
};

module.exports = {
  getPoints
};
