import { useContext, useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import AlmuLogo from '/logo/logo-blanco-claro.png';

import './navbarAdmin.css';
import { Li } from '../../Boton/Li';
import { Link } from 'react-router-dom';
import { Boton } from '../../Boton/Boton';
import { AuthContext } from '../../../context/AuthContextProvider';

export const NavbarAdmin = () => {
  const { logOut } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [view, setView] = useState('write');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectView = (view) => {
    setView(view);
    handleClose();
  };

  return (
    <>
      <div className="p-3">
        <Boton
          aspecto="btn-rounded-1 btn-admin"
          icon="bi bi-list"
          onClick={handleShow}
        />
      </div>

      <Offcanvas show={show} onHide={handleClose} className="aside-admin">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <img src={AlmuLogo} alt="" />
          <div className="nav-options">
            <ul>
              <Li
                icon="bi bi-pen"
                valor="Copywriting"
                as={Link}
                to="/admin/write"
                active={view === 'write'}
                onClick={() => selectView('write')}
              />
              <Li
                icon="bi bi-chat-right-dots"
                valor="Mensajes"
                as={Link}
                to="/admin/message"
                active={view === 'message'}
                onClick={() => selectView('message')}
              />
{/*               <Li
                icon="bi bi-columns"
                valor="Dashboard"
                as={Link}
                to="/admin/dashboard"
                active={view === 'dashboard'}
                onClick={() => selectView('dashboard')}
              /> */}
              <Li
                icon="bi bi-briefcase"
                valor="Servicios"
                as={Link}
                to="/admin/services"
                active={view === 'services'}
                onClick={() => selectView('services')}
              />
              <Li
                icon="bi bi-person"
                valor="Usuarios"
                as={Link}
                to="/admin/users"
                active={view === 'users'}
                onClick={() => selectView('users')}
              />
              <Li
                icon="bi bi-calendar2-week"
                valor="Horarios"
                as={Link}
                to="/admin/horarios"
                active={view === 'horarios'}
                onClick={() => selectView('horarios')}
              />
              <Li
                icon="bi bi-check2-circle"
                valor="Citas"
                as={Link}
                to="/admin/appointments"
                active={view === 'appointments'}
                onClick={() => selectView('appointments')}
              />
{/*               <Li
                icon="bi bi-bag-check"
                valor="Pedidos"
                as={Link}
                to="/admin/orders"
                active={view === 'orders'}
                onClick={() => selectView('orders')}
              /> */}
            </ul>
            <ul className="footer-list">
              <Boton
                onClick={logOut}
                aspecto="btn-5"
                icon="bi bi-escape"
                valor="Cerrar sesión"
              />
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
