import React, { useEffect } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import { get } from '../utils/httpService';
import { POLYGONS_URL } from '../utils/constants';

export const Map = () => {

  useEffect(() => {
    get(POLYGONS_URL);
  }, []);

  return (
    <LeafletMap
      center={[50.4547, 30.5238]}
      zoom={10}
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
      <Polygon positions={[
        [48.2539411446343, 33.310546875],
        [48.5747899109288, 34.365234375],
        [48.0633965377621, 34.12353515625]]
      } color="blue" onClick={(e) => console.log('he')} />
      <Marker position={[50.4547, 30.5238]}>
        <Popup>
          Popup for any custom information.
          </Popup>
      </Marker>
    </LeafletMap>
  );
}