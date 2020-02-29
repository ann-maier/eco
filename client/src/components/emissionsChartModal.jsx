import React from 'react';
import { Table } from 'react-bootstrap';

import { VerticallyCenteredModal } from "./modal";
import { Chart } from "./chart";

import "./emissionsChartModal.css";

const valuesPrecision = 2;
const emptyState = 'Немає даних';

export const EmissionsChartModal = ({
    onHide,
    show,
    emissionCalculations
}) => {
    const chartAverageData = emissionCalculations?.length > 0 ? emissionCalculations.map(emission => ({
        name: emission.element,
        value: emission.averageCalculations.sumFromAverageEmissions
    })) : [];

    const chartMaxData = emissionCalculations?.length > 0 ? emissionCalculations.map(emission => ({
        name: emission.element,
        value: emission.maximumCalculations.sumFromMaximumEmissions
    })) : [];

    return (
        <VerticallyCenteredModal size='xl' show={show} onHide={onHide}>
            <Table className="emissions-table">
                <thead>
                    <tr>
                        <th title='Елемент'>Елемент</th>
                        <th title='Одиниця виміру'>Одиниця виміру</th>
                        <th title='Середнє значення average викидів'>Середнє значення average викидів</th>
                        <th title='Сума average викидів'>Сума average викидів</th>
                        <th title='ГДК average'>ГДК average</th>
                        <th title='Перевищення ГДК average'>Перевищення ГДК average</th>
                        <th title='Середнє значення max викидів'>Середнє значення max викидів</th>
                        <th title='Сума max викидів'>Сума max викидів</th>
                        <th title='ГДК max'>ГДК max</th>
                        <th title='Перевищення ГДК max'>Перевищення ГДК max</th>
                    </tr>
                </thead>
                <tbody>
                    {emissionCalculations?.map(
                        (emission, id) => {
                          const exceedingByAverage = emission.averageCalculations.gdkAverage
                            ? (emission.averageCalculations.average / emission.averageCalculations.gdkAverage).toFixed(valuesPrecision)
                            : emptyState;

                          const exceedingByMaximum = emission.maximumCalculations.gdkMax
                            ? (emission.maximumCalculations.average / emission.maximumCalculations.gdkMax).toFixed(valuesPrecision)
                            : emptyState;

                          return (
                            <tr key={id}>
                              <td title={emission.element}>{emission.element}</td>
                              <td title={emission.measure}>{emission.measure}</td>
                              <td title={emission.averageCalculations.average}>{emission.averageCalculations.average.toFixed(valuesPrecision)}</td>
                              <td title={emission.averageCalculations.sumFromAverageEmissions}>{emission.averageCalculations.sumFromAverageEmissions.toFixed(valuesPrecision)}</td>
                              <td title={emission.averageCalculations.gdkAverage || emptyState}>{emission.averageCalculations.gdkAverage || emptyState}</td>
                              <td title={exceedingByAverage}>{exceedingByAverage}</td>
                              <td title={emission.maximumCalculations.average}>{emission.maximumCalculations.average.toFixed(valuesPrecision)}</td>
                              <td title={emission.maximumCalculations.sumFromMaximumEmissions}>{emission.maximumCalculations.sumFromMaximumEmissions.toFixed(valuesPrecision)}</td>
                              <td title={emission.maximumCalculations.gdkMax || emptyState}>{emission.maximumCalculations.gdkMax || emptyState}</td>
                              <td title={exceedingByMaximum}>{exceedingByMaximum}</td>
                            </tr>
                          )
                        }
                    )}
                </tbody>
            </Table>
            <h3>Сума average викидів</h3>
            <Chart data={chartAverageData} />
            <h3>Сума max викидів</h3>
            <Chart data={chartMaxData} />
        </VerticallyCenteredModal>
    );
};
