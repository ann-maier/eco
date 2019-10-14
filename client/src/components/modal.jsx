import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const VerticallyCenteredModal = (props) => (
  <Modal
    {...props}
    size='lg'
    aria-labelledby='contained-modal-title-vcenter'
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id='contained-modal-title-vcenter'>
        Modal heading
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);
