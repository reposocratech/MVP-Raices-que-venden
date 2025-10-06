import { Modal } from "react-bootstrap"; 
import { Boton } from "../../Boton/Boton";
import './editRedSocialData.css';
import { useContext, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import { AuthContext } from "../../../context/AuthContextProvider";

export const EditRedSocialData = ({ handleClose, show }) => {
  const { user, setUser, token } = useContext(AuthContext);

  const [newRedSocial, setNewRedSocial] = useState({ name: '', link: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRedSocial({ ...newRedSocial, [name]: value });
  };

  const onSubmit = async () => {
    try {
  
      const data = {
        user_id: user.user_id, 
        name: newRedSocial.name,
        link: newRedSocial.link
      };

      // Llamada al back
      const res = await fetchData('/user/addRedSocialData', 'POST', data, token);

      // Actualizamos
      setUser({
        ...user,
        texts: [...(user.texts || []), res.newRedSocial]
      });

     //limpiar
      setNewRedSocial({ name: '', link: '' });
      handleClose();
    } catch (error) {
      console.error("Error al añadir red social:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><i className="bi bi-pencil-square"></i> Mis Redes Sociales</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="edit-form">
          <div className="d-flex flex-column mb-3">
            <label>Nombre de la red</label>
            <input
              type="text"
              name="name"
              value={newRedSocial.name}
              onChange={handleChange}
              placeholder="Ej: Instagram"
            />
          </div>
          <div className="d-flex flex-column">
            <label>URL</label>
            <input
              type="text"
              name="link"
              value={newRedSocial.link}
              onChange={handleChange}
              placeholder="Ej: https://instagram.com/usuario"
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Boton aspecto="btn-1" valor="Guardar" onClick={onSubmit} />
        <Boton aspecto="btn-err-1" valor="Cancelar" onClick={handleClose} />
      </Modal.Footer>
    </Modal>
  );
};
