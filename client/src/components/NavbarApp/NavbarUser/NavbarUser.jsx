import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import './navbaruser.css'
import { Boton } from '../../Boton/Boton'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContextProvider'
import notAvatar from '../../../../public/icons/notAvatar.png'

export const NavbarUser = () => {

  const { logOut, user } = useContext(AuthContext);

  return (
     <Navbar collapseOnSelect expand="lg" className='nav-user d-flex justify-content-center align-items-center'>
      <Container>
        <Navbar.Brand as={Link} to='/user'><img src="/logo/logo-marron.png" alt=""/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-parents  align-items-center">
            <Nav.Link   as={Link} to='/user'>Inicio</Nav.Link>
            <Nav.Link   as={Link} to='/user/services'  >Servicios</Nav.Link>
            <Nav.Link  as={Link} to='/user/about'>Almudena</Nav.Link>  
            {/* <Nav.Link  as={Link} to='/user/shop'>Tienda</Nav.Link> */}
            <Nav.Link  as={Link} to='/user/contact'>Contacto</Nav.Link>
            <Nav.Link  as={Link} to='/user/chooseDate'>Agendar cita</Nav.Link>
            
          </Nav>

          <Nav className='nav-parents align-items-center'>
              <div 
                className='nav-photo'
                >
                <img src={user?.avatar ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${user.avatar}`: notAvatar} alt=""/>
              </div>

            <NavDropdown className='nav-parents' id='dropdown-button-drop-down-centered' as='btn-group' drop='down-centered' align={{ lg: 'end'}}>

                  <NavDropdown.Item
                    as={Link}
                    to='/user/profile'
                    >
                      <i className="bi bi-person-check"></i>
                      Mi perfil
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item
                    as={Link}
                    to='/user/myorders'
                    ><i className="bi bi-bag-check"></i>
                    Mis Compras
                  </NavDropdown.Item> */}
                  <NavDropdown.Item
                    as={Link}
                    to='/user/texts'
                    >
                    <i className="bi bi-file-earmark-text"></i>
                    Mis Textos
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link} to='/user/myAppointments' ><i className="bi bi-calendar-check"></i>
                    Mis Citas
                    </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={logOut}
                    >
                      <i className="bi bi-box-arrow-left"></i>
                      Salir
                      </NavDropdown.Item>
              
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
