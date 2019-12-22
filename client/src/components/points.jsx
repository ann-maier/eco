import React from 'react';
import { Circle, Popup, Marker, Leaf } from 'react-leaflet';
import {Icon} from "leaflet/dist/leaflet-src.esm";

export const Points = ({ points }) => (
  <>
    {points.map(({ Id: id, coordinates, Description: description, Image: image }) => (
      <>
        <Marker position={coordinates} icon={new Icon({
          iconUrl: image,
          iconSize: [20, 30],
        })}></Marker>
      <Circle key={id} center={coordinates} className={"poi"}>
        {/*<img src={ image } alt="Red dot" width={20} height={20} className={"poi__icon"}/>*/}
        <Popup>
          {description}
        </Popup>
      </Circle>
        </>
    ))}
  </>
);
