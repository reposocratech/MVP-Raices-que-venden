import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Boton } from '../../Boton/Boton';
import './createService.css';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';

const initialValue = {
  service_name: '',
  service_description: '',
  service_price: ''
}

export const CreateService = ({close, show, setServices}) => {
  const {token} = useContext(AuthContext);
  const [newServiceData, setNewServiceData] = useState(initialValue);
  const [newImg, setNewImg] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setNewServiceData({...newServiceData, [name]: value});
  }

  const handleChangeImg = (e) => {
    setNewImg(e.target.files[0]);
  }

  const handleClose = () => {
    setNewServiceData(initialValue);
    close();
  }

  const onSubmit = async() => {
    try {

      const newFormData = new FormData();
      console.log(newServiceData);
      newFormData.append('dataService', JSON.stringify(newServiceData));
      newFormData.append('img', newImg);

      console.log(Array.from(newFormData.entries()));
      

      let res = await fetchData('/admin/createService', 'POST', newFormData, token);
      setServices(prevServices=>[...prevServices,res.data[0]]);
      
      handleClose();
      
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
