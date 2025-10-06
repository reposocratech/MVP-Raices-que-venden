import { Modal } from "react-bootstrap"
import { Boton } from "../../Boton/Boton"
import './editimage.css'
import { useContext, useState } from "react"
import { fetchData } from "../../../helpers/axiosHelper"
import { AuthContext } from "../../../context/AuthContextProvider"



export const EditImage = ({show, handleClose}) => {

    const {user, setUser, token} = useContext(AuthContext)

    const [avatar, setAvatar] = useState();

    const handleChange = (e) => {
        setAvatar(e.target.files[0]);
    }

    const saveImage = async () => {
        try {
            const newFormdata = new FormData();
            newFormdata.append("data", JSON.stringify(user.user_id))
            newFormdata.append("img", avatar);
            let res = await fetchData('/user/editImage', 'PUT', newFormdata, token);
            if(res.data.filename){
                setUser(    {...user, 
                            avatar: res.data.filename
                        })
            }
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-pencil-square"></i> Editar Datos Personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="edit-form">
            <div className='div-file'>
                <label htmlFor="avatar"><i className="bi bi-person-bounding-box"></i> Subir imagen</label>
                <input
                  id='avatar'
                  type="file"
                  name='avatar'
                  value=""
                  hidden
                  onChange={handleChange}
                  />
            </div>
            
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Boton 
            onClick={saveImage}
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