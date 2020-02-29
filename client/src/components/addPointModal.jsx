import React, { useEffect, useState } from 'react';
import { Dropdown, Form } from "react-bootstrap";

import { TYPE_OF_OBJECT_URL } from "../utils/constants";
import { post, get, put } from "../utils/httpService";
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

const emptyState = {
  typeOfObject: 'Choose type of object'
};

export const AddPointModal = ({
  onHide,
  show,
  coordinates,
  setShouldFetchData,
  isEditPointMode,
  setIsEditPointMode,
  pointId,
  setPointId
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
    }).catch(() => setShouldFetchData(false))
  };

  const editPoint = emission => {
    put(`${POINT_URL}/${pointId}`, {
      name,
      description,
      type: type.id,
      emission
    }).then(() => {
      clearForm();
      onHide();
      setShouldFetchData(true);
      setIsEditPointMode(false);
      setPointId(null);
    }).catch(() => {
      setShouldFetchData(false);
      setIsEditPointMode(false);
      setPointId(null);
    })
  };

  const hide = () => {
    if (!isEditPointMode) {
      clearForm();
    }
    onHide();
  };

  useEffect(() => {
    get(TYPE_OF_OBJECT_URL).then(({ data }) => {
      setTypes(data);
    });
  }, []);

  useEffect(() => {
    if (isEditPointMode && pointId) {
      get(`${POINT_URL}/${pointId}`).then(({ data }) => {
        const type = types.find(({ id }) => id === data.type);
        if (type) {
          setType(type);
        }
        setName(data.name);
        setDescription(data.description);
      })
    }
  }, [pointId, isEditPointMode]);

  return (
    <VerticallyCenteredModal size='lg' show={show} onHide={() => hide()}>
      <Form>
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle size='sm' variant='success'>
              {type.name || emptyState.typeOfObject}
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

        {isEditPointMode
          ? <SubmitForm onSave={editPoint} />
          : <SubmitForm onSave={addPoint} />
        }
      </Form>
    </VerticallyCenteredModal>
  );
};
