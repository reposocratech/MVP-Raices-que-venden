import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import React from 'react'
import {Nav, Navbar, Container, NavDropdown, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbarpublic.css'
import { Boton } from '../../Boton/Boton'
import {Link} from 'react-router-dom'



export const NavbarApp = () => {


  return (
    <Navbar collapseOnSelect expand="lg" className='nav-public'>
      <Container>
        <Navbar.Brand href="#home"><img src="/logo/logo-marron.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-parents">
            <Nav.Link   as={Link} to='/'  >Inicio</Nav.Link>
               <NavDropdown className='nav-parents' title="Servicios" id="collapsible-nav-dropdown">
             
                <NavDropdown.Item >Redes sociales</NavDropdown.Item>
                <NavDropdown.Item >Email marketing</NavDropdown.Item>
                <NavDropdown.Item >Redacción web</NavDropdown.Item>
                 <NavDropdown.Item >Todo en uno</NavDropdown.Item>
              
             
            </NavDropdown>
            
            <Nav.Link  as={Link} to='/about'  >Sobre mí</Nav.Link>
            <Nav.Link  as={Link} to='/contact'  >Contactar</Nav.Link>
         
          </Nav>
          <Nav>

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
