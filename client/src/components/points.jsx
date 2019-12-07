import React from 'react';
import { Circle, Popup } from 'react-leaflet';

export const Points = ({ points }) => (
  <>
    {points.map(({ Id: id, coordinates, Description: description, Image: image }) => (

      <Circle key={id} center={coordinates}>
        <img src={ "data:image/png;base64," + image} alt="Red dot" />
        <Popup>
          {description}
        </Popup>
      </Circle>
    ))}
  </>
);
