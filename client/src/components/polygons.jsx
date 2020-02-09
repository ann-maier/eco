import React from 'react';
import { Popup, Polygon } from 'react-leaflet';

export const Polygons = ({ polygons, setPolygonId, setIsEditPolygonMode, setShowPolygonModal }) => {
  const handleClick = polygonId => {
    setPolygonId(polygonId);
    setIsEditPolygonMode(true);
    setShowPolygonModal(true);
  };

  return <>
    {polygons.map(({ poligonId, polygonPoints, brushColorR, brushColorG, brushColorB, expertName, name }) => (
      <Polygon
        onClick={() => handleClick(poligonId)}
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
