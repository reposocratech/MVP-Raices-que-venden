import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import notAvatar from './../../../../public/icons/notAvatar.png'
import './myprofile.css'
import { EditPersonalData } from "../../../components/Modals/EditPersonalData/EditPersonalData";
import { EditFacturationData } from "../../../components/Modals/EditFacturationData/EditFacturationData";
import { EditImage } from "../../../components/Modals/EditImage/EditImage";

const MyProfile = () => {
  const {user} = useContext(AuthContext);
  const [showPersonal, setShowPersonal] = useState(false);
  const [showFacturation, setShowFacturation] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleClosePersonal = () => {
    setShowPersonal(false)
  }

  const editPersonalData = () => {
    setShowPersonal(true)
  }

  const handleCloseFacturation = () => {
    setShowFacturation(false)
  }

  const editFacturationData = () => {
    setShowFacturation(true)
  }

  const handleCloseImage = () => {
    setShowImage(false)
  }

  const editImage = () => {
    setShowImage(true)
  }

  return (
    <>
      <Container className="py-3 contenedor-profile">
        <h2>Mi Perfil</h2>
        <hr />
        <Row sm={1} md={1} lg={2} className="sub-container-profile py-5">
          <Col  className="img-profile">
            <h2>¡Hola <span>{user?.user_name ? user?.user_name : user?.email}!</span></h2>
            <img src={user?.avatar ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${user.avatar}`: notAvatar} alt="" />
            <Link 
              onClick={editImage}
              className="edit-link"
              ><i className="bi bi-pencil-square"></i> 
              Cambiar imagen
              </Link>
          </Col>

          <Col className="data-profile">
            <div className="personal-data">
              <h4>Datos Personales</h4>
              <hr />
              <p>Nombre: <span>{user?.user_name}</span></p>
              <p>Apellidos: <span>{user?.last_name}</span></p>
              <p>Correo: <span>{user?.email}</span></p>
              <p>Teléfono: <span>{user?.phone_number}</span></p>
              <p>Pequeña descripción: <span>{user?.user_description}</span></p>
              <Link 
              onClick={editPersonalData}
              className="edit-link"
              ><i className="bi bi-pencil-square"></i> 
              Editar
              </Link>
            </div>
            <div className="facturation-data">
              <h4>Datos de Facturación</h4>
              <hr />
              <p>Nombre persona física o empresa: <span>{user?.company_name}</span></p>
              <p>NIF/CIF: <span>{user?.nif_cif}</span></p>
              <p>Ciudad: <span>{user?.city}</span></p>
              <p>Provincia: <span>{user?.province}</span></p>
              <p>Dirección: <span>{user?.address}</span></p>
              <Link 
              onClick={editFacturationData}
              className="edit-link"
              ><i className="bi bi-pencil-square"></i> 
              Editar
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal editar datos perosonales */}
      <EditPersonalData
        show={showPersonal}
        handleClose={handleClosePersonal}
        />
      {/* Modal editar datos de facturación */}
      <EditFacturationData
        show={showFacturation}
        handleClose={handleCloseFacturation}
        />  

      {/* Modal editar la imagen */}
      <EditImage
        show={showImage}
        handleClose={handleCloseImage}
      />


      </>
  )
}

export default MyProfile;