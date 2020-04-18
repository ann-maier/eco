const pool = require("../../db-config/mysql-config");

const { formatDateForDatabase } = require("../utils/formatDateForDatabase");

const getEmissionsCalculations = (req, res) => {
  const { idPoi, idPolygon, startDate: startDateISOString, endDate: endDateISOString } = req.query;
  const typeOfObject = idPoi ? "idPoi" : "idPoligon";
  const id = idPoi || idPolygon;

  console.log(req.query);
  const { stateDate, endDate } = { stateDate: formatDateForDatabase(startDateISOString), endDate: formatDateForDatabase(endDateISOString) };

  const query = `
    SELECT
      elements.short_name,
      idEnvironment,
      AVG(ValueAvg) AS averageFromAverageEmissions,
      MAX(ValueMax) AS maxFromMaximumEmissions,
      elements.Measure,
      gdk.mpc_avrg_d,
      gdk.mpc_m_ot,
      STR_TO_DATE(CONCAT(Year,'-',LPAD(Month,2,'00'),'-',LPAD(day,2,'00')), '%Y-%m-%d') as Concated_Date
    FROM 
      emissions_on_map
    INNER JOIN elements ON emissions_on_map.idElement = elements.code
    LEFT JOIN gdk ON emissions_on_map.idElement = gdk.code AND emissions_on_map.idEnvironment = gdk.environment
    WHERE ${typeOfObject} = ${id}
    GROUP BY idEnvironment, idElement
    HAVING Concated_Date >= ${stateDate} and Concated_Date < ${endDate} + interval 1 day;
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
