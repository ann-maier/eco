import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";

import { TYPE_OF_OBJECT } from "../utils/constants";
import { post } from "../utils/httpService";
import { POINT_URL } from "../utils/constants";

import { VerticallyCenteredModal } from "./modal";

const initialState = {
  form: {
    name: "",
    description: "",
    type: 0
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

  const addPoint = () => {
    post(POINT_URL, {
      name,
      description,
      type,
      coordinates
    }).then(() => {
      onHide();
      setShouldFetchData(true);
    });
  };

  return (
    <VerticallyCenteredModal size='sm' show={show} onHide={onHide}>
      <Form>
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle size='sm' variant='success'>
              Choose type of object
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {TYPE_OF_OBJECT.map(t => (
                <Dropdown.Item
                  key={t}
                  active={t === type}
                  onClick={() => setType(t)}
                >
                  {t}
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

        <Button variant='outline-primary' onClick={addPoint}>
          Save point
        </Button>
      </Form>
    </VerticallyCenteredModal>
  );
};
