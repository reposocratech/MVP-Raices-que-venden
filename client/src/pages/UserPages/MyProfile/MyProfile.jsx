import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import notAvatar from './../../../../public/icons/notAvatar.png';
import './myprofile.css';
import { EditPersonalData } from '../../../components/Modals/EditPersonalData/EditPersonalData';
import { EditFacturationData } from '../../../components/Modals/EditFacturationData/EditFacturationData';
import { EditImage } from '../../../components/Modals/EditImage/EditImage';
import { AddRedSocialData } from '../../../components/Modals/AddRedSocialData/AddRedSocialData';
import { fetchData } from '../../../helpers/axiosHelper';
import { Boton } from '../../../components/Boton/Boton';
import { iconsRedes } from '../../../middlewares/iconsRedes.js';
import { EditRedSocialData } from '../../../components/Modals/EditRedSocialData/EditRedSocialData.jsx';

const MyProfile = () => {
  const { user, setUser, token } = useContext(AuthContext);

  const [showPersonal, setShowPersonal] = useState(false);
  const [showFacturation, setShowFacturation] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showRedSocial, setShowRedSocial] = useState(false);
  const [showEditRed, setShowEditRed] = useState(false);
  const [selectedRed, setSelectedRed] = useState(null);
  const [redes, setRedes] = useState([]);

  useEffect(() => {
    const fetchRedes = async () => {
      try {
        const res = await fetchData('/user/getRedSocial', 'GET', null, token);

        setRedes(res.data.redSocial);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRedes();
  }, []);

  const addRedSocial = (red) => {
    setRedes([...redes, red]);
  };

  const deleteRedSocial = async (id) => {
    try {
      await fetchData(`/user/deleteRedSocial/${id}`, 'DELETE', null, token);

      setRedes(redes.filter((e) => e.social_network_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePersonal = () => {
    setShowPersonal(false);
  };

  const editPersonalData = () => {
    setShowPersonal(true);
  };

  const handleCloseFacturation = () => {
    setShowFacturation(false);
  };

  const editFacturationData = () => {
    setShowFacturation(true);
  };

  const handleCloseRedSocial = () => {
    setShowRedSocial(false);
  };

  const addRedSocialData = () => {
    setShowRedSocial(true);
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const editImage = () => {
    setShowImage(true);
  };

  const editRedSocialData = (red) => {
    setSelectedRed(red);
    setShowEditRed(true);
  };

  const handleCloseEditRed = () => {
    setShowEditRed(false);
    setSelectedRed(null);
  };

  return (
    <>
      <Container className="py-3 contenedor-profile">
        <h2>Mi Perfil</h2>
        <hr />
        <Row sm={1} md={1} lg={2} className="sub-container-profile py-5">
          <Col className="img-profile">
            <h2>
              ¡Hola{' '}
              <span>{user?.user_name ? user?.user_name : user?.email}!</span>
            </h2>
            <img
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${user.avatar}`
                  : notAvatar
              }
              alt=""
            />
            <Link onClick={editImage} className="edit-link">
              <i className="bi bi-pencil-square"></i>
              Cambiar imagen
            </Link>
          </Col>

          <Col className="data-profile">
            <div className="personal-data">
              <h4>Datos Personales</h4>
              <hr />
              <p>
                Nombre: <span>{user?.user_name}</span>
              </p>
              <p>
                Apellidos: <span>{user?.last_name}</span>
              </p>
              <p>
                Correo: <span>{user?.email}</span>
              </p>
              <p>
                Teléfono: <span>{user?.phone_number}</span>
              </p>
              <p>
                Pequeña descripción: <span>{user?.user_description}</span>
              </p>
              <Link onClick={editPersonalData} className="edit-link">
                <i className="bi bi-pencil-square"></i>
                Editar
              </Link>
            </div>
            <div className="facturation-data">
              <h4>Datos de Facturación</h4>
              <hr />
              <p>
                Nombre persona física o empresa:{' '}
                <span>{user?.company_name}</span>
              </p>
              <p>
                NIF/CIF: <span>{user?.nif_cif}</span>
              </p>
              <p>
                Ciudad: <span>{user?.city}</span>
              </p>
              <p>
                Provincia: <span>{user?.province}</span>
              </p>
              <p>
                Dirección: <span>{user?.address}</span>
              </p>
              <Link onClick={editFacturationData} className="edit-link">
                <i className="bi bi-pencil-square"></i>
                Editar
              </Link>
            </div>

            <div className="facturation-data">
              <h4>Mis redes sociales</h4>
              <hr />
              {redes?.map((e) => {
                return (
                  <Row className="map-redes" key={e.social_network_id}>
                    <Col sm={1}>
                      <i className={iconsRedes(e.name)}></i>
                    </Col>
                    <Col sm={2}>
                      <p>{e.name}</p>
                    </Col>
                    <Col sm={6}>
                      <p>{e.link}</p>
                    </Col>
                    <Col
                      sm={3}
                      className="d-flex justify-content-center align-content-center"
                    >
                      <Boton
                        icon="bi bi-pencil-square"
                        aspecto="btn-rounded-ok"
                        onClick={() => editRedSocialData(e)}
                      />
                      <Boton
                        icon="bi bi-trash3"
                        aspecto="btn-rounded-err"
                        onClick={() => deleteRedSocial(e.social_network_id)}
                      />
                    </Col>
                  </Row>
                );
              })}

              <Link onClick={addRedSocialData} className="edit-link">
                <i className="bi bi-plus-circle"></i>
                Añadir Red Social
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal editar datos perosonales */}
      <EditPersonalData show={showPersonal} handleClose={handleClosePersonal} />
      {/* Modal editar datos de facturación */}
      <EditFacturationData
        show={showFacturation}
        handleClose={handleCloseFacturation}
      />

      {/* Modal editar la imagen */}
      <EditImage show={showImage} handleClose={handleCloseImage} />

      {/* Añadir redes social */}
      <AddRedSocialData
        show={showRedSocial}
        handleClose={handleCloseRedSocial}
        setRedes={setRedes}
        addRedSocial={addRedSocial}
      />

      {/* Editar red social */}
      <EditRedSocialData
        show={showEditRed}
        handleClose={handleCloseEditRed}
        red={selectedRed}
        setRedes={setRedes}
      />

      {/* Eliminar red social */}
    </>
  );
};

export default MyProfile;
