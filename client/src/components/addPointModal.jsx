import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form } from "react-bootstrap";

import { ELEMENTS_URL, ENVIRONMENTS_URL, GDK_URL, TYPE_OF_OBJECT_URL } from "../utils/constants";
import { post, get } from "../utils/httpService";
import { POINT_URL } from "../utils/constants";

import { VerticallyCenteredModal } from "./modal";

const initialState = {
  form: {
    name: "",
    description: "",
    type: {
      id: 0,
      name: ''
    }
  }
};

export const AddPointModal = ({
  onHide,
  show,
  coordinates,
  setShouldFetchData
}) => {
  const [name, setName] = useState(initialState.form.name);
  const [description, setDescription] = useState(initialState.form.description);
  const [type, setType] = useState(initialState.form.type);
  const [types, setTypes] = useState([]);

  const addPoint = () => {
    post(POINT_URL, {
      name,
      description,
      type: type.id,
      coordinates,
      emission: {
        idElement: 148,
        idEnvironment: 4,
        valueAvg: 20,
        valueMax: 50,
        year: 2019,
        month: 11,
        day: 21,
        measure: 'kg/m',
      }
    }).then(() => {
      onHide();
      setShouldFetchData(true);
    });
  };

  useEffect(() => {
    get(TYPE_OF_OBJECT_URL).then(({ data }) => {
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    get(ENVIRONMENTS_URL).then(({ data }) => {
      console.log(data);
    });
    get(ELEMENTS_URL).then(({ data }) => {
      console.log(data);
    });
    post(GDK_URL, { code: 101, environment: 1 }).then(({ data }) => {
      console.log(data);
    });
  }, []);

  return (
    <VerticallyCenteredModal size='sm' show={show} onHide={onHide}>
      <Form>
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle size='sm' variant='success'>
              Choose type of object
            </Dropdown.Toggle>

            <Dropdown.Menu>
              { types.length && types.map(typeOfObject => (
                <Dropdown.Item
                  key={typeOfObject.id}
                  active={typeOfObject === type}
                  onClick={() => setType(typeOfObject)}
                >
                  {typeOfObject.name}
                </Dropdown.Item>
              )) }
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter name</Form.Label>
          <Form.Control
            type='input'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter description</Form.Label>
          <Form.Control
            as='textarea'
            rows='3'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant='outline-primary' onClick={addPoint}>
          Save point
        </Button>
      </Form>
    </VerticallyCenteredModal>
  );
};
