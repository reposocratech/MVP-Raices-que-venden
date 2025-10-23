import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import './myTexts.css';
import { Boton } from '../../../components/Boton/Boton';
import { useNavigate } from 'react-router-dom';

const MyTexts = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [userTexts, setUserTexts] = useState([]);

  useEffect(() => {
    const getUserTexts = async () => {
      const userData = { user_id: user.user_id };

      const res = await fetchData('/user/getTexts', 'POST', userData, token);
      console.log(res);
      setUserTexts(res.data);
    };
    getUserTexts();
  }, []);

  const textDeliveredOrPending = (text_status) => {
    let result;
    if (text_status === 1) {
      result = 'pendiente';
    } else if (text_status === 2) {
      result = 'entregado';
    }

    return result;
  };

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
        <div className="lista-citas mt-3">
          <h2>Mis Textos</h2>
          <hr />
          {userTexts.map((text) => {
            return (
              <Row key={text.text_id} className="card-list">
                <Col lg={1} md={2} sm={12}>
                  <img
                    className="avatar-appointment text-center"
                    src="/icons/doc.svg"
                    alt="avatar user"
                  />
                </Col>
                <Col lg={4} md={10} sm={12}>
                  <p className="m-0 text-center text-md-start">
                    {text?.text_title}
                  </p>
                </Col>
                <Col lg={1} md={4}>
                  <p className="m-0">{}</p>
                </Col>
                <Col lg={2} md={4}>
                  <p className="m-0 text-center">
                    {textDeliveredOrPending(text.text_status)}
                  </p>
                </Col>
                <Col lg={2} md={6} xs={6}>
                  <Boton
                    aspecto="btn-1 mx-auto mb-3 mb-md-0"
                    icon="bi bi-eye"
                    valor="ver texto"
                    onClick={() =>
                      navigate(`/user/textPreview/${text.text_id}`)
                    }
                  ></Boton>
                </Col>
                <Col lg={2} md={6} xs={6}>
                  {text.filename?
                  <Boton
                    aspecto="btn-3 mx-auto"
                    icon="bi bi-download"
                    valor="descargar"
                    onClick={()=>handleDownload(text)}
                  ></Boton>
                  :
                  <Boton
                    aspecto="btn-2 mx-auto"
                    icon="bi bi-x"
                    valor="sin archivo"
                  ></Boton>
                  
                }
                  
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default MyTexts;
