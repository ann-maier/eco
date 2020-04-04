import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import { Icon } from "leaflet/dist/leaflet-src.esm";
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { get } from '../utils/httpService';
import { EMISSIONS_CALCULATIONS_URL } from '../utils/constants';

import { EmissionsChartModal } from './emissionsChartModal';

import './popup.css';

const initialState = {
  showEmissionsChartModal: false,
  emissionCalculations: []
}

export const Points = ({ points, setShowPointModal, setPointId, setIsEditPointMode }) => {
  const handleClick = id => {
    setPointId(id);
    setIsEditPointMode(true);
    setShowPointModal(true)
  };

  const [emissionCalculations, setEmissionCalculations] = React.useState(
    initialState.emissions
  );
  const [showEmissionsChartModal, setShowEmissionsChartModal] = React.useState(
    initialState.showEmissionsChartModal
  );

  const getEmissions = id => {
    setShowEmissionsChartModal(true)
    getEmissionCalculations(id)
  }

  const getEmissionCalculations = id =>
    get(`${EMISSIONS_CALCULATIONS_URL}?idPoi=${id}`)
      .then(({ data }) => setEmissionCalculations(data))

  return (
    <>
      {points.map(({ Id: id, coordinates, name, Description: description, Image: image, emissions }) => (
        <Marker key={id} position={coordinates} icon={new Icon({
          iconUrl: image,
          iconSize: [20, 30],
        })}>
          <Popup minWidth={emissions.length ? "700" : "100"}>
            <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleClick(id)} className="edit-pencil-icon" />
            <div className="mt-4 mb-2">
              {name && <div><strong>Назва:</strong> {name}</div>}
              {description && <div><strong>Опис:</strong> {description}</div>}
            </div>
            {emissions.length > 0 &&
              <>
                <Table striped bordered hover size="sm" className="emissions-table">
                  <thead>
                    <tr>
                      <th title='Хімічний елемент'>Хімічний елемент</th>
                      <th title='Середовище'>Середовище</th>
                      <th title='Середнє значення'>Середнє значення</th>
                      <th title='Максимальне значення'>Максимальне значення</th>
                      <th title='Рік'>Рік</th>
                      <th title='Місяць'>Місяць</th>
                      <th title='День'>День</th>
                      <th title='Одиниця виміру'>Одиниця виміру</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emissions.map(({ short_name, name: environmentName, ValueAvg, ValueMax, Year, Month, day, Measure, }, key) => (
                      <tr key={key}>
                        <td title={short_name}>{short_name}</td>
                        <td title={environmentName}>{environmentName}</td>
                        <td title={ValueAvg}>{ValueAvg}</td>
                        <td title={ValueMax}>{ValueMax}</td>
                        <td title={Year}>{Year}</td>
                        <td title={Month}>{Month}</td>
                        <td title={day}>{day}</td>
                        <td title={Measure}>{Measure}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button size="sm" onClick={() => getEmissions(id)}>Відобразити графіки викидів</Button>
              </>}
            <EmissionsChartModal
              emissions={emissions}
              emissionCalculations={emissionCalculations}
              show={showEmissionsChartModal}
              onHide={() => setShowEmissionsChartModal(false)} />
          </Popup>
        </Marker>
      ))
      }
    </>
  );
};
