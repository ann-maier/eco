import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Button, Form } from "react-bootstrap";

import { post } from "../utils/httpService";
import { POLYGON_URL } from "../utils/constants";

import { VerticallyCenteredModal } from "./modal";

const initialState = {
  form: {
    brushColor: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    },
    lineThickness: 1,
    name: "",
    type: "poligon",
    description: ""
  }
};

export const AddPolygonModal = ({
  onHide,
  show,
  coordinates,
  setShouldFetchData,
  setNewPolygonCoordinates,
  user
}) => {
  const [lineThickness, setLineThickness] = useState(
    initialState.form.lineThickness
  );
  const [color, setColor] = useState(initialState.form.brushColor);
  const [name, setName] = useState(initialState.form.name);
  const [description, setDescription] = useState(initialState.form.description);


  const addPolygon = () => {
    post(POLYGON_URL, {
      brush_color_r: color.r,
      bruch_color_g: color.g,
      brush_color_b: color.b,
      brush_alfa: color.a,
      line_collor_r: color.r,
      line_color_g: color.g,
      line_color_b: color.b,
      line_alfa: color.a,
      line_thickness: Number(lineThickness),
      name,
      id_of_expert: Number(user.id_of_expert),
      type: initialState.form.type,
      description,
      points: coordinates.map((point, index) => ({
        latitude: point.lat,
        longitude: point.lng,
        order123: index
      })),
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
    })
      .then(() => {
        onHide();
        setNewPolygonCoordinates([]);
        setShouldFetchData(true);
      })
      .catch(() => {
        setNewPolygonCoordinates([]);
        setShouldFetchData(false);
      });
  };

  const handleChangeComplete = ({ rgb }) => {
    setColor(rgb);
  };

  return (
    <VerticallyCenteredModal size='sm' show={show} onHide={onHide}>
      <Form>
        <Form.Group>
          <Form.Label>
            Choose color of the polygon and line thickness
          </Form.Label>
          <Form.Control
            type='number'
            value={lineThickness}
            onChange={e => setLineThickness(e.target.value)}
          />
          <br />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
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

        <Button variant='outline-primary' onClick={addPolygon}>
          Save polygon
        </Button>
      </Form>
    </VerticallyCenteredModal>
  );
};
