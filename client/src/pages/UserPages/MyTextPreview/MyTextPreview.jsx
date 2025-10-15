import { Container } from 'react-bootstrap';
import { Boton } from '../../../components/Boton/Boton';
import MDEditor, { commands } from '@uiw/react-md-editor';

import './myTextPreview.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate, useParams } from 'react-router-dom';

const MyTextPreview = () => {
  const navigate = useNavigate();
  const {text_id} = useParams();
  const {token} = useContext(AuthContext);
  const [textForm, setTextForm] = useState();
  const [newDoc, setNewDoc] = useState('');

  useEffect(()=>{
    const getText = async () => {
      const result = await fetchData('/user/getText', 'POST', {text_id: text_id}, token);
      setTextForm(result.data);
      
      /* setTextForm(result) */
    }
    getText()
  }, [])

  return (
    <>
      <Container>
        <form className="writer" action="">
          <h2 className='my-3'>{textForm?.text_title}</h2>
          {/* Cuando importemos react-md-editor, hay que adaptarlo */}

            <MDEditor.Markdown source={textForm?.text_body}
                    name='text_body'
                    onChange={null}
                    value={textForm?.text_body}
                    className='text-editor mb-3'
                    minHeight={100}
                    commands={[]}
                    
            />
          <div className="writer-buttons mb-3">
            <Boton aspecto='btn-err-1' icon='bi bi-box-arrow-left' valor='Volver' onClick={()=>navigate(`/user/texts/`)} />
            <Boton aspecto='btn-1' icon='bi bi-download' valor='Descargar archivo'/>
          </div>

        </form>
      </Container>
    </>
  )
}

export default MyTextPreview;