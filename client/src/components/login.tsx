import React from 'react';
import { Button } from 'react-bootstrap';
import { Auth } from './auth';
import { VerticallyCenteredModal } from './modal';

export const Login: React.FunctionComponent = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Log In
      </Button>
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Auth onHide={() => setModalShow(false)} />
      </VerticallyCenteredModal>
    </React.Fragment>
  )
};
