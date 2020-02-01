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
    const pointsPromises = points.map(({ Id, Type, Coord_Lat, Coord_Lng, Description, name, Object_Type_Name }) => {
      const emissionOnMapPromise = new Promise((resolve, reject) => {
        const emissionsOnMapTable = 'emissions_on_map';
        const columnNames = ['idElement', 'idEnvironment', 'ValueAvg', 'ValueMax', 'Year', 'Month', 'day', 'Measure'];
        const query = `
          SELECT ??
          FROM
          ??
          WHERE
          ??
          =
          ?
        `;
        const values = [columnNames, emissionsOnMapTable, 'idPoi', Id];
        pool.query(query, values, (error, rows) => {
          if (error) {
            reject(error);
          }

          resolve(rows[0]);
        });
      });

      return emissionOnMapPromise.then(emission => {
        return {
          Id,
          coordinates: [Coord_Lat, Coord_Lng],
          Description,
          name,
          Image: iconsMap.get(+Type),
          Object_Type_Name,
          emission,
        };
      });
    });

    return Promise.all(pointsPromises).then(points => res.send(points));
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
