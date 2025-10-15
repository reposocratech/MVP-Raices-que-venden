import React from 'react'
import {Nav, Navbar, Container, NavDropdown, Button} from 'react-bootstrap';
import './navbarpublic.css'
import { Boton } from '../../Boton/Boton'
import {Link, useNavigate} from 'react-router-dom'





export const NavbarApp = () => {

  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" className='nav-public'>
      <Container>
        <Navbar.Brand as={Link} to='/'><img src="/logo/logo-marron.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-parents text-center">
            <Nav.Link   as={Link} to='/'  >Inicio</Nav.Link>
            <Nav.Link   as={Link} to='/services'  >Servicios</Nav.Link>
            <Nav.Link  as={Link} to='/about'  >Almudena</Nav.Link>
            <Nav.Link  as={Link} to='/contact'  >Contacto</Nav.Link>
         
          </Nav>
          <Nav>

            <div className='btn-group-vertical d-flex flex-lg-row gap-2 align-items-center'>
              <Boton
                aspecto="btn-1"
                valor="Registrar"
                onClick={() => navigate("/register")}
                />
              <Boton
                aspecto="btn-2"
                icon="bi bi-box-arrow-in-right"
                valor="Iniciar sesión"
                onClick={() => navigate("/login")}
                />
            </div>

         
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
