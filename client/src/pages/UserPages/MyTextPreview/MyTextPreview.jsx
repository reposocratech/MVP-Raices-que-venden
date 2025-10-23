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

  const handleDownload = async (textData) => {
    const safeTitle = (textData.filename).replace(/[^\w\-]+/g, '_') + '.docx';

    const res = await fetchData(
      `/user/downloadText`,
      'POST',
      {text_id: textData.text_id, filename: textData.filename},
      token,
      { responseType: 'blob' }
    );

    const blob = new Blob(
      [res.data],
      { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    );

    const link = document.createElement('a');
    const href = URL.createObjectURL(blob);
    link.href = href;
    link.download = safeTitle;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(href);
  }

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
            {textForm?.filename?
            <Boton aspecto='btn-3' icon='bi bi-download' valor='Descargar archivo' onClick={()=>handleDownload(textForm)}/>
            :
            <Boton aspecto='btn-2' icon='bi bi-x' valor='Sin archivo'/>
            }
          </div>

        </form>
      </Container>
    </>
  )
}

export default MyTextPreview;