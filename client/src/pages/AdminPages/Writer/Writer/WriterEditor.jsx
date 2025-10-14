import { Container } from 'react-bootstrap';
import { Boton } from '../../../../components/Boton/Boton';
import MDEditor, { commands } from '@uiw/react-md-editor';

import './writer.css';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../../../../helpers/axiosHelper';
import { useParams } from 'react-router-dom';

const WriterEditor = () => {
  const {text_id} = useParams();
  const {token} = useContext(AuthContext);
  const [textForm, setTextForm] = useState();
  const [newImg, setNewImg] = useState('');

  useEffect(()=>{
    const getText = async () => {
      const result = await fetchData('/admin/getText', 'POST', {text_id: text_id}, token);
      setTextForm(result.data);
      
      /* setTextForm(result) */
    }
    getText()
  }, [])

  const saveText = async () => {
    try {
      const res = await fetchData('/admin/saveText', 'PUT', textForm, token);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const publishOrHide = async (currentStatus) => {
    let futureStatus = 2;
    if(currentStatus === 2) {
      futureStatus = 1
    }

    let statusData = {
      text_id: text_id,
      text_status: futureStatus
    }

    const res = await fetchData('/admin/publishOrHide', 'PUT', statusData, token);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setTextForm({...textForm, [name]: value});
  }

  const handleText = (value) => {
    setTextForm({...textForm, text_body: value});
  }

  const handleChangeImg = (e) => {
    setNewImg(e.target.files[0]);
  }

  return (
    <>
      <Container>
        <form className="writer" action="">
          <label className='mb-3' htmlFor="">
            Nombre del documento
            <input type="text" 
                    name='text_title'
                    onChange={handleChange}
                    value={textForm?.text_title?textForm?.text_title:''}/>
          </label>
          {/* Cuando importemos react-md-editor, hay que adaptarlo */}

            <p className='mb-0'>Texto</p>
            <MDEditor 
                    name='text_body'
                    onChange={handleText}
                    value={textForm?.text_body}
                    className='text-editor mb-3'
                    minHeight={100}
                    commands={[
                      commands.bold,
                      commands.italic,
                      commands.link
                    ]}
                    
            />
          <div className="writer-buttons">
            <Boton aspecto='btn-err-1' valor='Cancelar' />
            <Boton aspecto='btn-1' valor='Añadir archivo'/>
            {textForm?.text_status === 1?
              <Boton aspecto='btn-1' icon='bi bi-eye' valor='Publicar' onClick={()=>publishOrHide(1)}/>
            :
              <Boton aspecto='btn-1' icon='bi bi-eye-slash' valor='Ocultar' onClick={()=>publishOrHide(2)}/>
            }
            <Boton aspecto='btn-3' valor='Guardar' onClick={saveText}/>
          </div>

        </form>
      </Container>
    </>
  )
}

export default WriterEditor;
