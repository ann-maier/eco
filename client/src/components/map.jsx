import React, { useEffect, useState } from 'react'
import { Map as LeafletMap, TileLayer, Popup, Polygon } from 'react-leaflet';

import { get } from '../utils/httpService';
import { POLYGONS_URL, MAP_CENTER_COORDS, POINTS_URL } from '../utils/constants';

const initialState = [
  {
    name: '',
    expertName: '',
    polygonPoints: [[0, 0]],
  }
];

export const Map = () => {
  const [polygons, setPolygons] = useState(initialState);

  useEffect(() => {
    get(POLYGONS_URL).then(({ data }) => setPolygons(data));
    get(POINTS_URL).then(({ data }) => console.log(data));
  }, []);

  return (
    <LeafletMap
      center={MAP_CENTER_COORDS}
      zoom={6}
      maxZoom={15}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {polygons.map(({ poligonId, polygonPoints, brushColorR, brushColorG, brushColorB, expertName, name }) => (
        <Polygon
          positions={polygonPoints}
          color={`rgba(${brushColorR}, ${brushColorG}, ${brushColorB}, 1)`}
          key={poligonId}>
          <Popup>
            {name} - {expertName}
          </Popup>
        </Polygon>
      )
      )}
    </LeafletMap>
  );
};
