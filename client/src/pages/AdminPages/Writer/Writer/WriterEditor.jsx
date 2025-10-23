import { Container } from 'react-bootstrap';
import { Boton } from '../../../../components/Boton/Boton';
import MDEditor, { commands } from '@uiw/react-md-editor';
import './writer.css';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '../../../../helpers/axiosHelper';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css"

import { useNavigate, useParams } from 'react-router-dom';


const WriterEditor = () => {
  const navigate = useNavigate();
  const {text_id} = useParams();
  const {token} = useContext(AuthContext);
  const [textForm, setTextForm] = useState();
  const [timer, setTimer] = useState(null);
  const [newDoc, setNewDoc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(()=>{
    const getText = async () => {
      const result = await fetchData('/admin/getText', 'POST', {text_id: text_id}, token);

      setTextForm(result.data);
      
      /* setTextForm(result) */
    }
    getText()
  }, [])


  const saveText = async (data=null) => {
    try {
      console.log(textForm);
      let sentForm = textForm;
      if(data){
        sentForm = data;
      }
      const res = await fetchData('/admin/saveText', 'PUT', sentForm, token);
      
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

    await fetchData('/admin/publishOrHide', 'PUT', statusData, token);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setTextForm({...textForm, [name]: value});

    if(timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(()=>{
      saveText({...textForm, [name]: value});
    }, 2000);

    setTimer(newTimer);
  }

  const handleText = (value) => {
    setTextForm({...textForm, text_body: value});

    if(timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(()=>{
      saveText({...textForm, text_body: value});
    }, 2000);

    setTimer(newTimer);
  }

  const handleChangeDoc = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.docx')) {
        setNewDoc(file);
        setUploadError('');
      } else {
        setNewDoc(null);
        setUploadError('Formato incorrecto. Solo .docx');
      }
    }
  };

  const saveDoc = async (e) => {
    e.preventDefault();
    if (!newDoc || uploading) return;
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('docx', newDoc);
      formData.append('text_id', String(text_id));

      const result = await fetchData('/admin/uploadDoc', 'POST', formData, token);

      const newText = {
        ...textForm,
        filename: result.data
      };
      setTextForm(newText);
      setNewDoc(null);

    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error subiendo el archivo';
      setUploadError(msg);
    } finally {
      setUploading(false);
    }
  };

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
                      commands.link,
                      commands.quote,
                      commands.strikethrough
                    ]}
                    
            />

          {newDoc && (
            <div className="mb-2" aria-live="polite">
              Archivo seleccionado: <strong>{newDoc.name}</strong>
            </div>
          )}
          {!!textForm?.filename && !newDoc && (
            <div className="mb-2">
              Archivo asociado: <strong>{textForm.filename}</strong>
            </div>
          )}
          {uploadError && (
            <div className="mb-2" style={{ color: 'crimson' }}>
              {uploadError}
            </div>
          )}
          <div className="writer-buttons mb-3">

            <Boton aspecto='btn-err-1' icon='bi bi-box-arrow-left' valor='Volver' onClick={()=>navigate(`/admin/write/texts/${textForm.user_id}`)} />
            {!newDoc && (
              <>
              <label htmlFor="docx" className='button-upload'>
                <Boton aspecto="btn-1 fake-button" icon="bi bi-upload" valor="Añadir archivo" type="button"/>
              </label>
              <input
                id="docx"
                type="file"
                accept=".docx"
                onChange={handleChangeDoc}
                className="input-hide"
              />
              </>
            )}

            {newDoc && (
              <Boton
                aspecto="btn-1"
                icon={uploading ? 'bi bi-hourglass-split' : 'bi bi-check-circle'}
                valor={uploading ? 'Subiendo…' : 'Confirmar'}
                onClick={saveDoc}
                type="button"
                disabled={uploading}
              />
            )}
            {textForm?.text_status === 1?
              <Boton aspecto='btn-1' icon='bi bi-eye' valor='Publicar' onClick={()=>publishOrHide(1)}/>
            :
              <Boton aspecto='btn-1' icon='bi bi-eye-slash' valor='Ocultar' onClick={()=>publishOrHide(2)}/>
            }
            <Boton aspecto='btn-3' valor='Guardar' onClick={()=>saveText(textForm)}/>

          </div>

        </form>
      </Container>
    </>
  )
}

export default WriterEditor;
