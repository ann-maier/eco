import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

export const Map = () => {
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
      <Marker position={[50.4547, 30.5238]}>
        <Popup>
          Popup for any custom information.
          </Popup>
      </Marker>
    </LeafletMap>
  );
}