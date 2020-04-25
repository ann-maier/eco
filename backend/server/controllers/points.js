const pool = require('../../db-config/mysql-config');

const iconsMapPromise = require('../utils/iconsMap')();

const { getEmissionsOnMap, SOURCE_POI } = require('./emissions_on_map');

const getPoints = (req, res) => {
  const query = `
  SELECT 
    poi.Id,
    poi.id_of_user,
    poi.Coord_Lat,
    poi.Coord_Lng,
    poi.Description,
    poi.name,
    poi.Type,
    type_of_object.Name as Object_Type_Name,
    owner_type as owner_type_id, 
    owner_types.type as owner_type_name
  FROM
    poi
  INNER JOIN
   type_of_object
  ON 
    poi.Type = type_of_object.id
  INNER JOIN 
    owner_types 
   ON 
    poi.owner_type = owner_types.id
  ;`;

  const pointsPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, rows) => {
      if (error) {
        reject(error);
      }

      resolve(rows);
    });
  });

  return pointsPromise
    .then((points) => {
      const pointsPromises = points.map(
        ({
          Id,
          id_of_user,
          Type,
          Coord_Lat,
          Coord_Lng,
          Description,
          name,
          Object_Type_Name,
          owner_type_id,
          owner_type_name,
        }) => {
          const emissionsOnMapPromise = getEmissionsOnMap(SOURCE_POI, Id);
          return Promise.all([emissionsOnMapPromise, iconsMapPromise]).then(
            ([emissions, iconsMap]) => ({
              Id,
              id_of_user,
              owner_type: {
                id: owner_type_id,
                name: owner_type_name,
              },
              coordinates: [Coord_Lat, Coord_Lng],
              Description,
              name,
              Image: iconsMap.get(+Type),
              Object_Type_Name,
              emissions,
            })
          );
        }
      );

      return Promise.all(pointsPromises).then((points) => res.send(points));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: error,
      });
    });
};

module.exports = {
  getPoints,
};
