import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import './navbaruser.css'
import { Boton } from '../../Boton/Boton'
import {Link} from 'react-router-dom'

export const NavbarUser = () => {
  return (
     <Navbar collapseOnSelect expand="lg" className='d-flex justify-content-center align-items-center'>
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
            
            <Nav.Link  as={Link} to='/user/orders'  >Mis pedidos</Nav.Link>
            <Nav.Link  as={Link} to='/user/chooseDate'  >Agendar cita</Nav.Link>
         
          </Nav>
          <Nav className='nav-parents'>

            <div className='nav-photo'>
              <img src="" alt="" />
            </div>

            <NavDropdown className='nav-parents'id="collapsible-nav-dropdown">
             
                <NavDropdown.Item as={Link} to='/user/profile' > Mi perfil</NavDropdown.Item>
                <NavDropdown.Item>Modificar perfil</NavDropdown.Item>
                 <NavDropdown.Item  >Salir</NavDropdown.Item>
              
             
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
