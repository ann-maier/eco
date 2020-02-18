import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import { Icon } from "leaflet/dist/leaflet-src.esm";
import { Button, Table } from 'react-bootstrap';
import { get } from '../utils/httpService';
import { EMISSIONS_CALCULATIONS_URL } from '../utils/constants';

import { EmissionsChartModal } from './emissionsChartModal';

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
      {points.map(({ Id: id, coordinates, Description: description, Image: image, emissions }) => (
        <Marker key={id} position={coordinates} icon={new Icon({
          iconUrl: image,
          iconSize: [20, 30],
        })}
          onClick={() => handleClick(id)}
        >
          <Popup minWidth={emissions.length ? "500" : "100"}>
            <p>{description}</p>
            {emissions.length > 0 &&
              <>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Хімічний елемент</th>
                      <th>Середовище</th>
                      <th>Середнє значення</th>
                      <th>Максимальне значення</th>
                      <th>Рік</th>
                      <th>Місяць</th>
                      <th>День</th>
                      <th>Одиниця виміру</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emissions.map(({ idElement, idEnvironment, ValueAvg, ValueMax, Year, Month, day, Measure }, key) => (
                      <tr key={key}>
                        <td>{idElement}</td>
                        <td>{idEnvironment}</td>
                        <td>{ValueAvg}</td>
                        <td>{ValueMax}</td>
                        <td>{Year}</td>
                        <td>{Month}</td>
                        <td>{day}</td>
                        <td>{Measure}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button size="sm" onClick={() => getEmissions(id)}>Відобразити графіки викидів</Button>
              </>}
            <EmissionsChartModal
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
