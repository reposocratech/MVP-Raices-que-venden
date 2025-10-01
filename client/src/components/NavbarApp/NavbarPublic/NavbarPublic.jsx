import React from 'react'
import {Nav, Navbar, Container, NavDropdown, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbarpublic.css'



export const NavbarApp = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-public">
      <Container>
        <Navbar.Brand href="#home"><img src="/logo/logo-marron.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-parents">
            <Nav.Link as={Link} to='/' >Inicio</Nav.Link>
               <NavDropdown className='nav-parents' title="Servicios" id="collapsible-nav-dropdown">
              <NavDropdown.Item >Redes sociales</NavDropdown.Item>
              <NavDropdown.Item >Email Marketing</NavDropdown.Item>
              <NavDropdown.Item >Redaccion web</NavDropdown.Item>
               <NavDropdown.Item >Pack completo</NavDropdown.Item>
             
            </NavDropdown>
            
            <Nav.Link >Mis pedidos</Nav.Link>
            <Nav.Link >Agendar cita</Nav.Link>
         
          </Nav>
          <Nav>
            <Button>hola</Button>
             <Button>hola</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
