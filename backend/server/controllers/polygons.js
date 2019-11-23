const pool = require('../../db-config/mysql-config');

const getPolygons = (req, res) => {
  const queryGetPoligons = `
    SELECT poligon.id_of_poligon, poligon.brush_color_r,
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

  let queryGetPoligonPoints = `
    SELECT
      point_poligon.longitude, point_poligon.latitude, point_poligon.Id_of_poligon
    FROM experts.point_poligon
    ORDER BY
      point_poligon.Id_of_poligon ASC,
      point_poligon.order ASC;
  `;

  return pool.query(queryGetPoligons, (error, poligons) => {
    return pool.query(queryGetPoligonPoints, (error, poligonPoints) => {
      const mappedPoligons = poligons.map((poligon) => {
        return {
          bruch_color_g: poligon.bruch_color_g,
          brush_alfa: poligon.brush_alfa,
          brush_color_b: poligon.brush_color_b,
          brush_color_r: poligon.brush_color_r,
          expert_name: poligon.expert_name,
          line_alfa: poligon.line_alfa,
          line_collor_r: poligon.line_collor_r,
          line_color_b: poligon.line_color_b,
          line_color_g: poligon.line_color_g,
          line_thickness: poligon.line_thickness,
          name: poligon.name,
          polygonPoints: poligonPoints.filter(({ Id_of_poligon }) => Id_of_poligon === poligon.id_of_poligon).map(({ latitude, longitude }) => ({ latitude, longitude })),
        }
      });
      return res.send(mappedPoligons);
    })
  });
};

module.exports = {
  getPolygons
};
