import React from 'react';
import { Popup, Polygon } from 'react-leaflet';

export const Polygons = ({ polygons }) => (
  <>
    {polygons.map(({ poligonId, polygonPoints, brushColorR, brushColorG, brushColorB, expertName, name }) => (
      <Polygon
        key={poligonId}
        positions={polygonPoints}
        color={`rgba(${brushColorR}, ${brushColorG}, ${brushColorB}, 1)`}>
        <Popup>
          {name} - {expertName}
        </Popup>
      </Polygon>
    ))}
  </>
)