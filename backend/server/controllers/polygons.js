const pool = require('../../db-config/mysql-config');

const mapPolygonPoints = (polygonPoints, idOfPolygon) => {
  return polygonPoints
    .filter(({ Id_of_poligon }) => Id_of_poligon === idOfPolygon)
    .map(({ latitude, longitude }) => [longitude, latitude]);
};

const getPolygons = (req, res) => {
  const queryGetPolygons = `
    SELECT 
      poligon.id_of_poligon,
      poligon.brush_color_r,
      poligon.bruch_color_g,
      poligon.brush_color_b,
      poligon.brush_alfa,
      poligon.line_collor_r,
      poligon.line_color_g,
      poligon.line_color_b,
      poligon.line_alfa,
      poligon.line_thickness,
      poligon.name,
      expert.expert_name
    FROM poligon
    INNER JOIN expert ON poligon.id_of_expert = expert.id_of_expert;
  `;

  let queryGetPolygonPoints = `
    SELECT
      point_poligon.longitude,
      point_poligon.latitude,
      point_poligon.Id_of_poligon
    FROM point_poligon
    ORDER BY
      point_poligon.Id_of_poligon ASC,
      point_poligon.order123 ASC;
  `;


  const getPolygonsPromise = new Promise((resolve, reject) => {
    pool.query(queryGetPolygons, (error, polygons) => {
      if (error) {
        reject(error);
      }

      return resolve(polygons);
    });
  });

  const queryGetPolygonPointsPromise = new Promise((resolve, reject) => {
    pool.query(queryGetPolygonPoints, (error, polygonPoints) => {
      if (error) {
        reject(error);
      }

      return resolve(polygonPoints);
    });
  });

  return Promise.all([
    getPolygonsPromise,
    queryGetPolygonPointsPromise
  ]).then(
    ([polygons, polygonPoints]) => {
      const mappedPolygons = polygons.map(polygon => {
        const mappedPolygonPoints = mapPolygonPoints(
          polygonPoints,
          polygon.id_of_poligon
        );

        return {
          poligonId: polygon.id_of_poligon,
          brushAlfa: polygon.brush_alfa,
          brushColorR: polygon.brush_color_r,
          brushColorG: polygon.bruch_color_g,
          brushColorB: polygon.brush_color_b,
          expertName: polygon.expert_name,
          lineAlfa: polygon.line_alfa,
          lineCollorR: polygon.line_collor_r,
          lineColorB: polygon.line_color_b,
          lineColorG: polygon.line_color_g,
          lineThickness: polygon.line_thickness,
          name: polygon.name,
          polygonPoints: mappedPolygonPoints,
        };
      });

      return res.send(mappedPolygons);
    })
    .catch(error => {
      res.status(500).send({
        message: error
      })
    });
};

const addPolygon = (req, res) => {
  const lastIdQuery = `
    SELECT
      MAX(??) as maxId
    FROM ??
    ;`;

  return pool.query(lastIdQuery, ['id_of_poligon', 'poligon'],(error, rows) => {
    if (error) {
      throw error;
    }

    const insertPolygonQuery = `
      INSERT INTO
      ??
      VALUES
      (?)
    `;

    const id = rows[0].maxId + 1;
    const { points, ...values } = req.body;

    pool.query(insertPolygonQuery, ['poligon', [id, ...Object.values(values)]], error => {
      if (error) {
        throw error;
      }

      points.forEach(({ longitude, latitude, order123 }) => {
        const insertPolygonPointsQuert = `
        INSERT INTO
        ??
        VALUES
        (?)
        `;

        pool.query(insertPolygonPointsQuert, ['point_poligon', [longitude, latitude, id, order123]], error => {
          if (error) {
            throw error;
          }
        });
      });

      return res.sendStatus(200);
    });
  });
};



module.exports = {
  getPolygons,
  addPolygon
};
