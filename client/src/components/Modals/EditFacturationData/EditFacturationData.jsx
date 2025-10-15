import { Modal } from "react-bootstrap"
import { Boton } from "../../Boton/Boton"
import './editfacturationdata.css'
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContextProvider"
import { fetchData } from "../../../helpers/axiosHelper"


export const EditFacturationData = ({handleClose, show}) => {

    const { user, setUser, token } = useContext(AuthContext);

    const [newFacturationData, setNewFacturationData] = useState(user);

    const handleChange = (e) => {
      const {name, value} = e.target;
      setNewFacturationData({...newFacturationData, [name]:value});
    }

    const saveFacturationData = async() => {
      try {
        await fetchData('/user/editFacturationData', "PUT", newFacturationData, token)

        setUser({...user , 
          company_name: newFacturationData.company_name,
          cif_nif: newFacturationData.cif_nif,
          city: newFacturationData.city,
          province: newFacturationData.province,
          address: newFacturationData.address
        })

        handleClose()

      } catch (error) {
        console.log(error);
      }
    }

    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-titleForm"><i className="bi bi-pencil-square"></i> Editar Datos de Facturación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="edit-form">
            <div className='input-div'>
                <label htmlFor="company_name">Nombre persona física o empresa</label>
                <input
                className="inputForm"
                  id='company_name'
                  type="text"
                  name='company_name'
                  value={newFacturationData?.company_name}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="nif_cif">NIF/CIF</label>
                <input
                className="inputForm"
                  id='nif_cif'
                  type="text"
                  name='nif_cif'
                  value={newFacturationData?.nif_cif}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="city">Ciudad</label>
                <input
                className="inputForm"
                  id='city'
                  type="text"
                  name='city'
                  value={newFacturationData?.city}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="province">Provincia</label>
                <input
                className="inputForm"
                  id='province'
                  type="text"
                  name='province'
                  value={newFacturationData?.province}
                  onChange={handleChange}
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="adress">Dirección</label>
                <input
                className="inputForm"
                  id='adress'
                  type="text"
                  name='address'
                  value={newFacturationData?.address}
                  onChange={handleChange}
                  />
            </div>
          
        </form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center gap-4">
          <Boton 
            aspecto="btn-3 w-25"
            valor="Guardar"
            onClick={saveFacturationData}
          />
          <Boton 
            onClick={handleClose}
            aspecto="btn-err-1 w-25"
            valor="Cancelar"
          />
        </Modal.Footer>
      </Modal>
    )
}