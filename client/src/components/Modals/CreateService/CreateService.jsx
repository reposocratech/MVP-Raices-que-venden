import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Boton } from '../../Boton/Boton';
import './createService.css';
import { fetchData } from '../../../helpers/axiosHelper';

const initialValue = {
  service_name: '',
  service_description: '',
  service_price: ''
}

export const CreateService = ({handleClose, show}) => {
  const [newServiceData, setNewServiceData] = useState(initialValue);

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setNewServiceData({...newServiceData, [name]: value});
  }

  const onSubmit = async() => {
    try {

      const newFormData = new FormData();

      newFormData.append('data', JSON.stringify(newServiceData));
      newFormData.append('img', serviceImage)

      await fetchData('/createService', 'POST')
      
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="edit-form">
            <div className='input-div'>
                <label htmlFor="name">Nombre del servicio</label>
                <input
                  id='name'
                  type="text"
                  name='service_name'
                  value={newServiceData.service_name}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="description">Descripción del servicio</label>
                <textarea
                  id='description'
                  type="text"
                  name='service_description'
                  value={newServiceData.service_description}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="price">Coste</label>
                <input
                  id='price'
                  type="text"
                  name='service_price'
                  value={newServiceData.service_price}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="price">Coste</label>
                <input
                  id='price'
                  type="text"
                  name='service_price'
                  value={null}
                  onChange={handleChange}
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
            onClick={null}
            aspecto="btn-1"
            valor="Guardar"
          />
        </Modal.Footer>
      </Modal>
  )
}
