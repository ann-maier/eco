import React from 'react';
import { Popup, Polygon } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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
        onClick={() => getEmissionCalculations(poligonId)}
        key={poligonId}
        positions={polygonPoints}
        color={`rgba(${brushColorR}, ${brushColorG}, ${brushColorB}, 1)`}>
        <Popup>
          <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleClick(poligonId)} className="edit-pencil-icon" />
          <div className="mt-4 mb-2">
            {name && <div><strong>Назва:</strong> {name}</div>}
            {expertName && <div><strong>Керівник який поставив:</strong> {expertName}</div>}
          </div>
        </Popup>
      </Polygon>
    ))}
  </>
};
