import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { get } from '../utils/httpService';
import { EXPERTS_URL } from '../utils/constants';

import './filtration.css';

export const Filtration = ({ setFilteredItems }) => {
  let filtrationForm;
  const [existingExperts, setExistingExperts] = useState([]);

  useEffect(() => {
    get(EXPERTS_URL).then(({ data }) => {
      setExistingExperts(data);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const { expertCheckbox: expertCheckboxes } = filtrationForm;
    const selectedExperts = Array.from(expertCheckboxes)
      .filter(({ checked }) => checked)
      .map(({ value }) => {
        return existingExperts.find(
          ({ id_of_expert }) => +id_of_expert === +value
        );
      });

    setFilteredItems(selectedExperts);
  };

  return (
    <Form
      onSubmit={submitHandler}
      className='filtration-form d-flex justify-content-center flex-column'
      ref={form => filtrationForm = form}
    >
      <Form.Group>
        <Form.Label>Select expert</Form.Label>
        {existingExperts.length &&
          existingExperts.map((expert) => (
            <Form.Check
              label={expert.expert_name}
              type='checkbox'
              value={expert.id_of_expert}
              key={expert.id_of_expert}
              name='expertCheckbox'
            />
          ))}
      </Form.Group>

      <Button variant='primary' type='submit' className='text-center'>
        Submit
      </Button>
    </Form>
  );
};