import React, { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import { get } from '../utils/httpService';
import { POLYGONS_URL, POINTS_URL, MAP_CENTER_COORDS, OPEN_STREET_MAP_URL } from '../utils/constants';

import { Polygons } from './polygons';
import { Points } from './points';
import { AddGeographicObjectModal } from './addGeographicObjectModal';

const initialState = {
  polygons: [
    {
      name: '',
      expertName: '',
      polygonPoints: [],
    }
  ],
  points: [],
  isAddPointModeEnabled: false,
  showModal: false,
  newPointCoordinates: [],
  shouldFetchData: false,
};

export const MapView = () => {
  const [polygons, setPolygons] = useState(initialState.polygons);
  const [points, setPoints] = useState(initialState.points);
  const [isAddPointModeEnabled, setAddPointMode] = useState(initialState.isAddPointModeEnabled);
  const [showModal, setShowModal] = useState(initialState.showModal);
  const [newPointCoordinates, setNewPointCoordinates] = useState(initialState.newPointCoordinates);
  const [shouldFetchData, setShouldFetchData] = useState(initialState.shouldFetchData);

  const fetchData = () => {
    get(POLYGONS_URL).then(({ data }) => setPolygons(data));
    get(POINTS_URL).then(({ data }) => setPoints(data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
    }
  }, [shouldFetchData]);

  const addGeographicObjectToMap = ({ latlng: { lat, lng } }) => {
    if (isAddPointModeEnabled) {
      setNewPointCoordinates([lat, lng]);
      setShowModal(true);
    } else
      return;
  };

  const buttonText = isAddPointModeEnabled ? "Disable add point mode" : "Add point to the map";

  return (
    <>
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
        onClick={addGeographicObjectToMap}
      >
        <TileLayer
          url={OPEN_STREET_MAP_URL}
        />
        <Polygons polygons={polygons} />
        <Points points={points} />
      </LeafletMap>
      { sessionStorage.getItem('user') &&
        (
          <Navbar expand="lg" bg="dark">
            <Button size="sm"
            variant={isAddPointModeEnabled ? 'outline-danger' : 'outline-primary'}
            onClick={() => setAddPointMode(!isAddPointModeEnabled)}>
            {buttonText}
            </Button>
          </Navbar>
        )
      }

      <AddGeographicObjectModal
        show={showModal}
        onHide={() => setShowModal(false)}
        setShouldFetchData={setShouldFetchData}
        coordinates={newPointCoordinates} />
    </>
  );
};
