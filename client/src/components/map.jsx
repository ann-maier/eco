import React, { useEffect, useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import { get } from '../utils/httpService';
import {
  POLYGONS_URL,
  POINTS_URL,
  MAP_CENTER_COORDS,
  OPEN_STREET_MAP_URL
} from '../utils/constants';

import { Polygons } from './polygons';
import { Points } from './points';
import { AddPointModal } from './addPointModal';
import { AddPolygonModal } from './addPolygonModal';
import { Filtration } from './filtration';

import './map.css';

const initialState = {
  polygons: [
    {
      name: '',
      expertName: '',
      polygonPoints: []
    }
  ],
  filteredPolygons: [],
  filteredItems: [],
  points: [],
  isAddPointModeEnabled: false,
  isAddPolygonModeEnabled: false,
  showPointModal: false,
  showPolygonModal: false,
  newPointCoordinates: [],
  newPolygonCoordinates: [],
  shouldFetchData: true,
  isEditPointMode: false,
  pointId: null,
};

const buttonText = (geographicalObj, isModeEnabled) =>
  isModeEnabled
    ? `Disable add ${geographicalObj} mode`
    : `Add ${geographicalObj} to the map`;

export const MapView = ({ user }) => {
  const [filteredItems, setFilteredItems] = useState(initialState.filteredItems);
  const [filteredPolygons, setFilteredPolygons] = useState(initialState.filteredPolygons);
  const [points, setPoints] = useState(initialState.points);
  const [shouldFetchData, setShouldFetchData] = useState(
    initialState.shouldFetchData
  );

  // points
  const [isAddPointModeEnabled, setAddPointMode] = useState(
    initialState.isAddPointModeEnabled
  );
  const [showPointModal, setShowPointModal] = useState(
    initialState.showPointModal
  );
  const [newPointCoordinates, setNewPointCoordinates] = useState(
    initialState.newPointCoordinates
  );

  // polygons
  const [isAddPolygonModeEnabled, setAddPolygonMode] = useState(
    initialState.isAddPolygonModeEnabled
  );
  const [showPolygonModal, setShowPolygonModal] = useState(
    initialState.showPolygonModal
  );
  const [newPolygonCoordinates, setNewPolygonCoordinates] = useState(
    initialState.newPolygonCoordinates
  );
  const [isEditPointMode, setIsEditPointMode] = useState(
    initialState.isEditPointMode
  );
  const [pointId, setPointId] = useState(initialState.pointId);


  const fetchData = () => {
    get(POLYGONS_URL).then(({ data }) => {
      setFilteredPolygons(data);
      initialState.polygons = data;
    });
    get(POINTS_URL).then(({ data }) => setPoints(data));
  };

  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  useEffect(() => {
    if (filteredItems.length) {
      const filteredPolygons = initialState.polygons.filter(({ idOfExpert }) => {
        return filteredItems.some(
          ({ id_of_expert }) => idOfExpert === id_of_expert
        );
      });
      setFilteredPolygons(filteredPolygons);
    } else {
      setFilteredPolygons(initialState.polygons);
    }
  }, [filteredItems]);

  const addGeographicalObjectToMap = ({ latlng: { lat, lng } }) => {
    if (isAddPointModeEnabled) {
      setNewPointCoordinates([lat, lng]);
      setShowPointModal(true);
      return;
    }

    if (isAddPolygonModeEnabled) {
      setNewPolygonCoordinates([...newPolygonCoordinates, { lat, lng }]);
    }
  };

  const finishPolygon = () => {
    setAddPolygonMode(false);

    if (newPolygonCoordinates.length >= 3) {
      setShowPolygonModal(true);
    } else {
      setNewPolygonCoordinates([]);
    }
  };

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
        onClick={addGeographicalObjectToMap}
      >
        <TileLayer url={OPEN_STREET_MAP_URL} />
        <Polygons polygons={filteredPolygons} />
        <Points points={points}
                setPointId={setPointId}
                setIsEditPointMode={setIsEditPointMode}
                setShowPointModal={setShowPointModal}
        />
      </LeafletMap>
      {user && (
        <Navbar expand='lg' className='map-options'>
          <Button
            size='sm'
            variant={isAddPointModeEnabled ? "outline-danger" : "outline-primary"}
            onClick={() => setAddPointMode(!isAddPointModeEnabled)}
          >
            {buttonText("point", isAddPointModeEnabled)}
          </Button>
          <Button
            className='ml-3'
            size='sm'
            variant={
              isAddPolygonModeEnabled ? "outline-danger" : "outline-primary"
            }
            onClick={() => setAddPolygonMode(!isAddPolygonModeEnabled)}
          >
            {buttonText("polygon", isAddPolygonModeEnabled)}
          </Button>
          {isAddPolygonModeEnabled && (
            <Button
              className='ml-3'
              size='sm'
              variant='outline-success'
              onClick={finishPolygon}
            >
              Finish polygon
            </Button>
          )}
        </Navbar>
      )}

      <Filtration setFilteredItems={setFilteredItems} />

      <AddPointModal
        show={showPointModal}
        onHide={() => setShowPointModal(false)}
        setShouldFetchData={setShouldFetchData}
        coordinates={newPointCoordinates}
        isEditPointMode={isEditPointMode}
        setIsEditPointMode={setIsEditPointMode}
        pointId={pointId}
        setPointId={setPointId}
      />
      <AddPolygonModal
        show={showPolygonModal}
        onHide={() => setShowPolygonModal(false)}
        setShouldFetchData={setShouldFetchData}
        setNewPolygonCoordinates={setNewPolygonCoordinates}
        coordinates={newPolygonCoordinates}
        user={user}
      />
    </>
  );
};
