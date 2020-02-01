const pool = require('../../db-config/mysql-config');

const tableName = 'emissions_on_map';
const SOURCE_POI = 'poi';
const SOURCE_POLYGON = 'polygon';

const insertEmissionOnMap = (source, emission) => {
  const { idPoi, idElement, idEnvironment, valueAvg, valueMax, idPolygon, year, month, day, measure } = emission;
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO 
        ??
        (??)
        VALUES
        (?)`;

    const columnNames = ['idElement', 'idEnvironment', 'ValueAvg', 'ValueMax', 'Year', 'Month', 'day', 'Measure'];
    const values = [idElement, idEnvironment, valueAvg, valueMax, year, month, day, measure];
    if (source === SOURCE_POI) {
      columnNames.push('idPoi');
      values.push(idPoi);
    } else if (source === SOURCE_POLYGON) {
      columnNames.push('idPoligon');
      values.push(idPolygon);
    }

    const parameters = [tableName, columnNames, values];
    pool.query(query, parameters, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    })
  });
};

const getEmissionOnMap = (source, id) => {
  let columnName;
  if (source === SOURCE_POI) {
    columnName = 'idPoi';
  } else if (source === SOURCE_POLYGON) {
    columnName = 'idPoligon';
  }

  return new Promise((resolve, reject) => {
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
    const values = [columnNames, emissionsOnMapTable, columnName, id];
    pool.query(query, values, (error, rows) => {
      if (error) {
        reject(error);
      }

      resolve(rows[0]);
    });
  });
};

module.exports = {
  insertEmissionOnMap,
  SOURCE_POI,
  SOURCE_POLYGON,
  getEmissionOnMap,
};
