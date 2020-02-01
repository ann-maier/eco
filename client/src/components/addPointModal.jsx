import React, { useEffect, useState } from 'react';
import { Dropdown, Form } from "react-bootstrap";

import { TYPE_OF_OBJECT_URL } from "../utils/constants";
import { post, get } from "../utils/httpService";
import { POINT_URL } from "../utils/constants";

import { VerticallyCenteredModal } from "./modal";
import { SubmitForm } from './submitForm';

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

  const clearForm = () => {
    setName(initialState.form.name);
    setDescription(initialState.form.description);
    setType(initialState.form.type);
  };

  const addPoint = emission => {
    post(POINT_URL, {
      name,
      description,
      type: type.id,
      coordinates,
      emission
    }).then(() => {
      clearForm();
      onHide();
      setShouldFetchData(true);
    });
  };

  useEffect(() => {
    get(TYPE_OF_OBJECT_URL).then(({ data }) => {
      setTypes(data);
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
              {types.length && types.map(typeOfObject => (
                <Dropdown.Item
                  key={typeOfObject.id}
                  active={typeOfObject === type}
                  onClick={() => setType(typeOfObject)}
                >
                  {typeOfObject.name}
                </Dropdown.Item>
              ))}
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

        <SubmitForm onSave={addPoint} />
      </Form>
    </VerticallyCenteredModal>
  );
};
