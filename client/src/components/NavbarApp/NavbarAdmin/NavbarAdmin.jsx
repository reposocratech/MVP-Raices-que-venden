import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AlmuLogo from '/logo/logo-marron.png';

import './navbarAdmin.css'

export const NavbarAdmin = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose} className='aside-admin'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src={AlmuLogo} alt="" className='almuBrand'/>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}