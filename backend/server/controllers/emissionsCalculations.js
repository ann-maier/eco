const pool = require("../../db-config/mysql-config");

const getEmissionsCalculations = (req, res) => {
  const { idPoi, idPolygon } = req.query;
  const typeOfObject = idPoi ? "idPoi" : "idPoligon";
  const id = idPoi || idPolygon;

  const query = `
    SELECT
      elements.short_name,
      idEnvironment,
      AVG(ValueAvg) AS averageFromAverageEmissions,
      MAX(ValueMax) AS maxFromMaximumEmissions,
      elements.Measure,
      gdk.mpc_avrg_d,
      gdk.mpc_m_ot
    FROM 
      emissions_on_map
    INNER JOIN elements ON emissions_on_map.idElement = elements.code
    LEFT JOIN gdk ON emissions_on_map.idElement = gdk.code AND emissions_on_map.idEnvironment = gdk.environment
    WHERE ${typeOfObject} = ${id}
    GROUP BY idEnvironment, idElement;
  `;

  return pool.query(query, [], (error, rows) => {
    if (error) {
      return res.status(500).send({
        message: error,
      });
    }

    const response = rows.map(
      ({
        short_name: shortName,
        idEnvironment,
        averageFromAverageEmissions,
        maxFromMaximumEmissions,
        mpc_avrg_d: gdkAverage,
        mpc_m_ot: gdkMax,
        Measure: measure,
      }) => {
        return {
          element: shortName,
          idEnvironment,
          averageCalculations: {
            average: averageFromAverageEmissions,
            gdkAverage,
          },
          maximumCalculations: {
            max: maxFromMaximumEmissions,
            gdkMax,
          },
          measure,
        };
      }
    );

    return res.send(JSON.stringify(response));
  });
};

module.exports = {
  getEmissionsCalculations,
};
