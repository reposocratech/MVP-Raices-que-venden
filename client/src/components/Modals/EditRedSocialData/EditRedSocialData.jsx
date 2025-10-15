import { Modal } from 'react-bootstrap';
import { Boton } from '../../Boton/Boton';
import { useContext, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useEffect } from 'react';
import './editRedSocial.css';

export const EditRedSocialData = ({ handleClose, show, red, setRedes }) => {
  const { token } = useContext(AuthContext);

  const [editRedSocial, setEditRedSocial] = useState(
    red || { name: '', link: '' }
  );

  useEffect(() => {
    setEditRedSocial(red || { name: '', link: '' });
  }, [red]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRedSocial({ ...editRedSocial, [name]: value });
  };

  console.log(red, 'holaaaaa');

  const editRedSocialData = async () => {
    try {
      const data = {
        name: editRedSocial.name,
        link: editRedSocial.link,
        user_id: editRedSocial.user_id,
      };

      const result = await fetchData(
        `/user/editRedSocial/${editRedSocial.social_network_id}`,
        'PUT',
        data,
        token
      );

      setRedes((prevRedes) => {
        const redesActualizadas = prevRedes.map((red) => {
          if (red.social_network_id === editRedSocial.social_network_id) {
            return editRedSocial;
          } else {
            return red;
          }
        });
        return redesActualizadas;
      });

      console.log(result, '******************************');
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title className="modal-titleForm">
          <i className="bi bi-pencil-square"></i> Mis Redes Sociales
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="edit-form">
          <div className="input-div">
            <label>Nombre de la red</label>
            <select
            className="inputForm"
              type="text"
              name="name"
              value={editRedSocial.name}
              onChange={handleChange}
              placeholder="Ej: Instagram"
            >
              <option className='options' value="facebook">Facebook</option>
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
            className="inputForm"
              type="text"
              name="link"
              value={editRedSocial.link}
              onChange={handleChange}
              placeholder="Ej: https://instagram.com/usuario"
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="justify-content-center gap-4">
        <Boton aspecto="btn-3 w-25" valor="Guardar" onClick={editRedSocialData} />
        <Boton aspecto="btn-err-1 w-25" valor="Cancelar" onClick={handleClose} />
      </Modal.Footer>
    </Modal>
  );
};
