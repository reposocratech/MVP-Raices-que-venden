import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { Boton } from '../../Boton/Boton';
import './deleteService.css';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';

export const DeleteService = ({handleClose, show, setServices, service}) => {
  const {token} = useContext(AuthContext);

  const onSubmit = async() => {
    try {

      await fetchData('/admin/deleteService', 'DELETE', service, token);
      setServices(prevServices=>prevServices.filter((elem)=>elem.service_id!==service.service_id));
      handleClose();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>
          ¿Estás segura que quieres eliminar este servicio? Se borrará permanentemente.
        </p>
        </Modal.Body>
        <Modal.Footer>
          
          <Boton 
            onClick={handleClose}
            aspecto="btn-1"
            valor="Cancelar"
          />
          <Boton 
            onClick={onSubmit}
            aspecto="btn-err-1"
            valor="Confirmar"
          />
        </Modal.Footer>
      </Modal>
  )
}
