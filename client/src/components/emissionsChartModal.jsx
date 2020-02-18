import React from 'react';
import { Table } from 'react-bootstrap';

import { VerticallyCenteredModal } from "./modal";
import { Chart } from "./chart";

export const EmissionsChartModal = ({
    onHide,
    show,
    emissionCalculations
}) => {
    const chartAverageData = emissionCalculations?.length > 0 ? emissionCalculations.map(emission => ({
        name: emission.element,
        value: emission.averageCalculations.sumFromAverageEmissions
    })) : []

    const chartMaxData = emissionCalculations?.length > 0 ? emissionCalculations.map(emission => ({
        name: emission.element,
        value: emission.maximumCalculations.sumFromMaximumEmissions
    })) : []

    return (
        <VerticallyCenteredModal size='sm' show={show} onHide={onHide}>
            {emissionCalculations?.map(
                (emission, id) =>
                    <div key={id}>
                        <h5>Елемент: {emission.element}</h5>
                        <p>Одиниця виміру: {emission.measure}</p>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Середнє значення average викидів</th>
                                    <th>Сума average викидів</th>
                                    <th>ГДК average</th>
                                    <th>Середнє значення max викидів</th>
                                    <th>Сума max викидів</th>
                                    <th>ГДК max</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{emission.averageCalculations.average}</td>
                                    <td>{emission.averageCalculations.sumFromAverageEmissions}</td>
                                    <td>{emission.averageCalculations.gdkAverage}</td>
                                    <td>{emission.maximumCalculations.average}</td>
                                    <td>{emission.maximumCalculations.sumFromMaximumEmissions}</td>
                                    <td>{emission.maximumCalculations.gdkMax}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
            )}
            <h3>Сума average викидів</h3>
            <Chart data={chartAverageData} />
            <h3>Сума max викидів</h3>
            <Chart data={chartMaxData} />
        </VerticallyCenteredModal>
    );
};