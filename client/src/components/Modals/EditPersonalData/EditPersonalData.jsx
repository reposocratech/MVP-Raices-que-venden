import { Modal } from "react-bootstrap"
import { Boton } from "../../Boton/Boton"
import './editpersonaldata.css'
import { useContext, useState } from "react"
import { fetchData } from "../../../helpers/axiosHelper"
import { AuthContext } from "../../../context/AuthContextProvider"
import { useNavigate } from "react-router-dom"



export const EditPersonalData = ({handleClose, show}) => {

    const {user, setUser,  token} = useContext(AuthContext);

    const [newPersonalData, setNewPersonalData] = useState(user)

    const handleChange = (e) => {
      const {name, value} = e.target;
      setNewPersonalData({...newPersonalData, [name]:value})
    }

    const savePersonalData = async() => {
      try {
        await fetchData('/user/editPersonalData', "PUT", newPersonalData, token);
        
        setUser({...user, 
          user_name: newPersonalData.user_name,
          last_name: newPersonalData.last_name,
          phone_number: newPersonalData.phone_number,     
          user_description: newPersonalData.user_description            
        })

        handleClose()

      } catch (error) {
        console.log(error)
      }
    }

    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-pencil-square"></i> Editar Datos Personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="edit-form">
            <div className='input-div'>
                <label htmlFor="name">Nombre</label>
                <input
                  id='name'
                  type="text"
                  name='user_name'
                  value={newPersonalData.user_name}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="last_name">Apellidos</label>
                <input
                  id='last_name'
                  type="text"
                  name='last_name'
                  value={newPersonalData.last_name}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="phone_number">Teléfono</label>
                <input
                  id='phone_number'
                  type="text"
                  name='phone_number'
                  value={newPersonalData.phone_number}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id='description'
                  type="text"
                  name='user_description'
                  value={newPersonalData.user_description}
                  onChange={handleChange}
                  />
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Boton 
            onClick={savePersonalData}
            aspecto="btn-1"
            valor="Guardar"
          />
          <Boton 
            onClick={handleClose}
            aspecto="btn-err-1"
            valor="Cancelar"
          />
        </Modal.Footer>
      </Modal>
    )
}