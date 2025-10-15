import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { Boton } from '../../../../components/Boton/Boton';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminCardText } from '../../../../components/AdminCardText/AdminCardText';

const WriterTexts = () => {
  const navigate = useNavigate();
  const {user_id} = useParams();
  const [texts, setTexts] = useState([]);

  const {token} = useContext(AuthContext);

  useEffect( ()=>{
    const getTextsFromUser = async() => {
      console.log(user_id, 'lololo');
      const res = await fetchData('/admin/getTextsFromUser', 'POST', {user_id: user_id}, token);
      console.log(res);
      setTexts(res.data);
    }
    getTextsFromUser();
  }, [])

  const createNewText = async () => {
    console.log('estoy aca');
    const res = await fetchData('/admin/createNewText', 'POST', {user_id: user_id}, token);
    console.log(res.data);
    /* navigate() */

  }

  return (
    <Container>

      <h2>Textos para {}</h2>

      <h2><Boton aspecto='btn-rounded-1 d-inline' icon='bi bi-box-arrow-left' onClick={()=>navigate('/admin/write')}/> Textos para {texts[0]?.user_name?texts[0]?.user_name:texts[0]?.email}</h2>

      <hr />
      {/* <Boton aspecto='btn-3 ms-auto mb-3' valor='Añadir servicio' onClick={()=>setShowCreateService(true)}/> */}
      <Boton aspecto='btn-3 ms-auto mb-3' valor='Crear texto' onClick={createNewText}/>
        <Row className='justify-content-center g-4 mb-4'>
          {texts.map((text)=>{
            return(
              <Col xs={12} md={4} lg={2} key={text.text_id}>
                <AdminCardText text={text}/>
              </Col>
            )
          })}
        </Row>
    </Container>
  )
}

export default WriterTexts;