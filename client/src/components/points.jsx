import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import { Icon } from "leaflet/dist/leaflet-src.esm";

export const Points = ({ points, setShowPointModal, setPointId, setIsEditPointMode }) => {
  const handleClick = id => {
    setPointId(id);
    setIsEditPointMode(true);
    setShowPointModal(true)
  };

  return (
    <>
      {points.map(({ Id: id, coordinates, Description: description, Image: image }) => (
        <Marker key={id} position={coordinates} icon={new Icon({
          iconUrl: image,
          iconSize: [20, 30],
        })} onClick={() => handleClick(id)}
        >
          <Popup>
            {description}
          </Popup>
        </Marker>
      ))}
    </>
  );
};
