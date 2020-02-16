import React from 'react';
import { Popup, Polygon } from 'react-leaflet';
import { get } from '../utils/httpService';
import { EMISSIONS_CALCULATIONS_URL } from '../utils/constants';

export const Polygons = ({ polygons, setPolygonId, setIsEditPolygonMode, setShowPolygonModal }) => {
  const handleClick = polygonId => {
    setPolygonId(polygonId);
    setIsEditPolygonMode(true);
    setShowPolygonModal(true);
  };
  const getEmissionCalculations = id =>
    get(`${EMISSIONS_CALCULATIONS_URL}?idPolygon=${id}`).then(console.log).catch(console.log);

  return <>
    {polygons.map(({ poligonId, polygonPoints, brushColorR, brushColorG, brushColorB, expertName, name }) => (
      <Polygon
        onClick={() => handleClick(poligonId)}
        onClick={() => getEmissionCalculations(poligonId)}
        key={poligonId}
        positions={polygonPoints}
        color={`rgba(${brushColorR}, ${brushColorG}, ${brushColorB}, 1)`}>
        <Popup>
          {name} - {expertName}
        </Popup>
      </Polygon>
    ))}
  </>
};
