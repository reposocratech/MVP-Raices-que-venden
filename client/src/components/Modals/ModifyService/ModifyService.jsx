import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Boton } from '../../Boton/Boton';
import './modifyService.css';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';

export const ModifyService = ({handleClose, show, setServices, service}) => {
  const {token} = useContext(AuthContext);
  const [editServiceData, setEditServiceData] = useState(service);
  const [newImg, setNewImg] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setEditServiceData({...editServiceData, [name]: value});
  }

  const handleChangeImg = (e) => {
    setNewImg(e.target.files[0]);
  }

  const onSubmit = async() => {
    try {

      const newFormData = new FormData();
      console.log(editServiceData);
      newFormData.append('dataService', JSON.stringify(editServiceData));
      newFormData.append('img', newImg);

      console.log('***********',Array.from(newFormData.entries()));
      

      const res = await fetchData('/admin/modifyService', 'PUT', newFormData, token);
      const updatedService = res.data[0][0];
      setServices(prevServices=>prevServices.map((elem)=>elem.service_id!==updatedService.service_id?elem:updatedService));
      
      handleClose();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="edit-form">
            <div className='input-div'>
                <label htmlFor="name">Nombre del servicio</label>
                <input
                  id='name'
                  type="text"
                  name='service_name'
                  value={editServiceData?.service_name}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="description">Descripción del servicio</label>
                <textarea
                  id='description'
                  type="text"
                  name='service_description'
                  value={editServiceData?.service_description}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="price">Coste</label>
                <input
                  id='price'
                  type="text"
                  name='service_price'
                  value={editServiceData?.service_price}
                  onChange={handleChange}
                  />
            </div>
            <span>Imagen</span>
            <div className='input-div img-input'>
                <label htmlFor="img"><i className="bi bi-image"></i></label>
                <input
                  id='img'
                  type="file"
                  name='img'
                  onChange={handleChangeImg}
                  hidden
                  />
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          
          <Boton 
            onClick={handleClose}
            aspecto="btn-err-1"
            valor="Cancelar"
          />
          <Boton 
            onClick={onSubmit}
            aspecto="btn-1"
            valor="Guardar"
          />
        </Modal.Footer>
      </Modal>
  )
}
