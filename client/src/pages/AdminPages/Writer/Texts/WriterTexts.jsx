import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { Boton } from '../../../../components/Boton/Boton';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminCardText } from '../../../../components/AdminCardText/AdminCardText';

import './writerTexts.css';

const WriterTexts = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(0);
  const [textsChanged, setTextsChanged] = useState(false);
  const {user_id} = useParams();
  const [texts, setTexts] = useState([]);
  const [filteredTexts, setFilteredTexts] = useState([]);

  const {token} = useContext(AuthContext);

  useEffect( ()=>{
    const getTextsFromUser = async() => {
      const res = await fetchData('/admin/getTextsFromUser', 'POST', {user_id: user_id}, token);
      setTexts(res.data);
      if (view === 0) {
      return setFilteredTexts(res.data.filter((text)=>text.text_status !== 3));
    } else if (view === 1) {
      return setFilteredTexts(res.data.filter((text) => text.text_status === 1));
    } else if (view === 2) {
      return setFilteredTexts(res.data.filter((text) => text.text_status === 2));
    } else if (view === 3) {
      return setFilteredTexts(res.data.filter((text) => text.text_status === 3));
    }
    }
    getTextsFromUser();
  }, [textsChanged])

  const createNewText = async () => {
    const res = await fetchData('/admin/createNewText', 'POST', {user_id: user_id}, token);
    navigate(`/admin/write/editor/${res.data.text_id}`);
  }

  const handleFilter = (statusText) => {
    setView(statusText);

    if (statusText === 0) {
      return setFilteredTexts(texts.filter((text)=>text.text_status !== 3));
    } else if (statusText === 1) {
      return setFilteredTexts(texts.filter((text) => text.text_status === 1));
    } else if (statusText === 2) {
      return setFilteredTexts(texts.filter((text) => text.text_status === 2));
    } else if (statusText === 3) {
      return setFilteredTexts(texts.filter((text) => text.text_status === 3));
    }
  };

  return (
    <Container>

      <h2><Boton aspecto='btn-rounded-1 d-inline' icon='bi bi-box-arrow-left' onClick={()=>navigate('/admin/write')}/> Textos para {texts[0]?.user_name? texts[0]?.user_name : texts[0]?.email}</h2>

      <hr />
      {/* <Boton aspecto='btn-3 ms-auto mb-3' valor='Añadir servicio' onClick={()=>setShowCreateService(true)}/> */}
      <Row className='justify-content-between'>
        <Col className='col-auto'>
          <ul className="lista-filter">
            <li
              className={view === 0 ? 'active-0' : ''}
              onClick={() => handleFilter(0)}
            >
              <i className="bi bi-arrow-clockwise"></i> Todos
            </li>
            <li
              className={view === 1 ? 'active-2' : ''}
              onClick={() => handleFilter(1)}
            >
              <i className="bi bi-pen"></i> Borrador
            </li>
            <li
              className={view === 2 ? 'active-3' : ''}
              onClick={() => handleFilter(2)}
            >
              <i className="bi bi-check2-circle"></i> Entregados
            </li>
            <li
              className={view === 3 ? 'active-3' : ''}
              onClick={() => handleFilter(3)}
            >
              <i className="bi bi-trash"></i> Papelera
            </li>
          </ul>
        </Col>
        <Col className='col-auto'>
          <Boton aspecto='btn-3 ms-auto mb-3' valor='Crear texto' onClick={createNewText}/>
        </Col>
      </Row>
      
        <Row className='justify-content-center g-4 mb-4'>
          {filteredTexts.map((text)=>{
            return(
              <Col xs={12} md={4} lg={2} key={text.text_id}>
                <AdminCardText text={text} textsChanged={()=>setTextsChanged(!textsChanged)}/>
              </Col>
            )
          })}
        </Row>
    </Container>
  )
}

export default WriterTexts;