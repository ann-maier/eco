import React, { useEffect, useState } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import { get } from '../utils/httpService';
import { POLYGONS_URL, POINTS_URL, MAP_CENTER_COORDS, OPEN_STREET_MAP_URL } from '../utils/constants';

import { Polygons } from './polygons';
import { Points } from './points';

const initialState = {
  polygons: [
    {
      name: '',
      expertName: '',
      polygonPoints: [],
    }
  ],
  points: []
};

export const Map = () => {
  const [polygons, setPolygons] = useState(initialState.polygons);
  const [points, setPoints] = useState(initialState.points);

  useEffect(() => {
    get(POLYGONS_URL).then(({ data }) => setPolygons(data));
    get(POINTS_URL).then(({ data }) => setPoints(data));
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
        url={OPEN_STREET_MAP_URL}
      />
      <Polygons polygons={polygons} />
      <Points points={points} />
    </LeafletMap>
  );
};
