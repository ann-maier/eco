import React from 'react';
import { Circle, Popup } from 'react-leaflet';

export const Points = ({ points }) => (
  <>
    {points.map(({ Id: id, coordinates, Description: description }) => (
      <Circle key={id} center={coordinates}>
        <Popup>
          {description}
        </Popup>
      </Circle>
    ))}
  </>
)