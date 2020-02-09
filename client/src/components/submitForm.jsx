import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Alert } from "react-bootstrap";

import { ELEMENTS_URL, ENVIRONMENTS_URL, GDK_URL } from "../utils/constants";
import { post, get } from "../utils/httpService";

const initialState = {
    form: {
        environment: {
            id: 4,
            name: 'Please select environment'
        },
        date: new Date(),
        valueAvg: 0,
        valueMax: 0,
        gdk: 100000,
        element: {
            code: 0,
            short_name: 'Please select element'
        },
        measure: '',
    }
};

export const SubmitForm = ({ onSave }) => {
    const [isActive, setIsActive] = useState(false);
    const buttonText = isActive ? 'Less' : 'More';

    const [environments, setEnvironments] = useState([]);
    const [selectedEnvironment, setEnvironment] = useState(initialState.form.environment);
    const [date, setDate] = useState(initialState.form.date);
    const [valueAvg, setAvgValue] = useState(initialState.form.valueAvg);
    const [gdkAvg, setGdkAvg] = useState(initialState.form.gdk);
    const [valueMax, setMaxValue] = useState(initialState.form.valueMax);
    const [gdkMax, setGdkMax] = useState(initialState.form.gdk);
    const [elements, setElements] = useState([]);
    const [selectedElement, setElement] = useState(initialState.form.element);
    const [measure, setMeasure] = useState(initialState.form.measure);

    const clearForm = () => {
        setEnvironment(initialState.form.environment);
        setDate(initialState.form.date);
        setAvgValue(initialState.form.valueAvg);
        setGdkAvg(initialState.form.gdk);
        setMaxValue(initialState.form.valueMax);
        setGdkMax(initialState.form.gdk);
        setElement(initialState.form.element);
        setMeasure(initialState.form.measure);
    }

    const onClick = () => {
        clearForm();
        setIsActive(!isActive);
    }

    const handleSubmit = () => {
        let emission;

        if (isActive && date) {
            const [year, month, day] = date.split('-');

            emission = isActive && {
                valueAvg,
                valueMax,
                year,
                month,
                day,
                idElement: selectedElement.code,
                idEnvironment: selectedEnvironment.id,
                measure,
            };

        }

        onSave(emission);
        clearForm();
    }

    const selectElement = element => {
        setElement(element);
        setMeasure(element.measure);

        post(GDK_URL, { code: element.code, environment: selectedEnvironment.id })
            .then(({ data }) => {
                if (data.average && data.max) {
                    setGdkAvg(data.average);
                    setGdkMax(data.max);
                } else {
                    setGdkAvg(initialState.form.valueAvg);
                    setGdkMax(initialState.form.valueMax);
                }
            })
    }

    useEffect(() => {
        get(ENVIRONMENTS_URL).then(({ data }) => setEnvironments(data));
        get(ELEMENTS_URL).then(({ data }) => setElements(data));
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center">
                <Button onClick={onClick}>{buttonText}</Button>
            </div>
            {isActive && (
                <>
                    <Form.Group>
                        <Dropdown>
                            <Dropdown.Toggle size='sm' variant='success'>
                                {selectedEnvironment.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {environments.length && environments.map(environment => (
                                    <Dropdown.Item
                                        disabled={environment.id !== 4} // TODO: remove this shitey ASAP
                                        key={environment.id}
                                        onClick={() => setEnvironment(environment)}
                                    >
                                        {environment.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter date</Form.Label>
                        <Form.Control
                            type='date'
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter average value</Form.Label>
                        <Form.Control
                            type='number'
                            min='0'
                            value={valueAvg}
                            onChange={e => setAvgValue(+e.target.value)}
                        />
                    </Form.Group>
                    {gdkAvg > 0 && gdkAvg < valueAvg && <Alert variant="danger">Average value is too high ({gdkAvg})</Alert>}

                    <Form.Group>
                        <Form.Label>Enter max value</Form.Label>
                        <Form.Control
                            type='number'
                            min='0'
                            value={valueMax}
                            onChange={e => setMaxValue(+e.target.value)}
                        />
                    </Form.Group>
                    {gdkMax > 0 && gdkMax < valueMax && <Alert variant="danger">Max value is too high ({gdkMax})</Alert>}

                    <Form.Group>
                        <Dropdown>
                            <Dropdown.Toggle size='sm' variant='success'>
                                {selectedElement.short_name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                style={{
                                    height: '500px',
                                    overflowY: 'scroll',
                                }}>
                                {elements.length && elements.map(element => (
                                    <Dropdown.Item
                                        key={element.code}
                                        onClick={() => selectElement(element)}
                                    >
                                        {element.short_name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    {measure && (
                        <Form.Group>
                            <Form.Label>Measure</Form.Label>
                            <Form.Control
                                type='input'
                                disabled
                                value={measure}
                            />
                        </Form.Group>
                    )}
                </>
            )}
            <Button variant='outline-primary' onClick={handleSubmit}>Save</Button>
        </>
    )
}
