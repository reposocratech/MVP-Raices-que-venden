import React from 'react'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import './navbarpublic.css'
import { Boton } from '../../Boton/Boton'


export const NavbarApp = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-public">
      <Container>
        <Navbar.Brand href="#home"><img src="/logo/logo-marron.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='nav-parents' id="responsive-navbar-nav">
          <Nav className="me-auto nav-parents">
            <Nav.Link >Inicio</Nav.Link>
            <Nav.Link >Pricing</Nav.Link>
            <NavDropdown className='nav-parents' title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>

            <div className='d-flex gap-2'>
              <Boton
                aspecto="btn-1"
       
                valor="Registrar"
                />
              <Boton
                aspecto="btn-2"
                icon="bi bi-box-arrow-in-right"
                valor="Iniciar sesión"
                />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
