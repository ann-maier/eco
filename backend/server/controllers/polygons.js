const pool = require('../../db-config/mysql-config');

const mapPolygonPoints = (polygonPoints, idOfPolygon) => {
  return polygonPoints
    .filter(({ Id_of_poligon }) => Id_of_poligon === idOfPolygon)
    .map(({ latitude, longitude }) => ({ latitude, longitude }));
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
    FROM experts.poligon
    INNER JOIN experts.expert ON poligon.id_of_expert = expert.id_of_expert;
  `;

  let queryGetPolygonPoints = `
    SELECT
      point_poligon.longitude,
      point_poligon.latitude,
      point_poligon.Id_of_poligon
    FROM experts.point_poligon
    ORDER BY
      point_poligon.Id_of_poligon ASC,
      point_poligon.order ASC;
  `;

  return pool.query(queryGetPolygons, (error, polygons) => {
    if (error) {
      throw error;
    }

    return pool.query(queryGetPolygonPoints, (error, polygonPoints) => {
      if (error) {
        throw error;
      }

      const mappedPolygons = polygons.map((polygon) => {
        const mappedPolygonPoints = mapPolygonPoints(polygonPoints, polygon.id_of_poligon);

        return {
          id_of_poligon: polygon.id_of_poligon,
          bruch_color_g: polygon.bruch_color_g,
          brush_alfa: polygon.brush_alfa,
          brush_color_b: polygon.brush_color_b,
          brush_color_r: polygon.brush_color_r,
          expert_name: polygon.expert_name,
          line_alfa: polygon.line_alfa,
          line_collor_r: polygon.line_collor_r,
          line_color_b: polygon.line_color_b,
          line_color_g: polygon.line_color_g,
          line_thickness: polygon.line_thickness,
          name: polygon.name,
          polygonPoints: mappedPolygonPoints,
        }
      });
      return res.send(mappedPolygons);
    })
  });
};

module.exports = {
  getPolygons
};
