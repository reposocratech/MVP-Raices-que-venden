import { Modal } from "react-bootstrap"; 
import { Boton } from "../../Boton/Boton";
import './addredsocialdata.css';
import { useContext, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import { AuthContext } from "../../../context/AuthContextProvider";

export const AddRedSocialData = ({ handleClose, show, addRedSocial}) => {
  const { user, token } = useContext(AuthContext);

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

      // Añadir las redes a la base de datos.
      let res = await fetchData('/user/addRedSocialData', 'POST', data, token);
      
      let { idRedSocial } = res.data;

      addRedSocial({
        ...data,
        social_network_id: idRedSocial
      })


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
          <div className="input-div">
            <label>Nombre de la red</label>
            <select
              type="text"
              name="name"
              value={newRedSocial.name}
              onChange={handleChange}
              placeholder="Ej: Instagram"
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="threads">Threads</option>
              <option value="tiktok">TikTok</option>
              <option value="x">X (twitter)</option>
              <option value="youtube">Youtube</option>
              <option value="twitch">Twitch</option>
              <option value="vimeo">Vimeo</option>
            </select>
          </div>
          <div className="input-div">
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
