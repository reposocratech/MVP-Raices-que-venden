import React, { useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./home.css";
import { Boton } from "../../../components/Boton/Boton";
import { AuthContext } from "../../../context/AuthContextProvider";
import CardService from "../../../components/cardService/CardService";

const Home = () => {
   
  const { services } = useContext(AuthContext);
console.log(services)
  return (

    <>
      <section className="home">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="texto-home">
              <h1 className="h1-ppal">Raíces que Venden</h1>
              <p className="h5">Copywriting rural con alma · By Almuyalma</p>
              <p>
                Convierto las cosas en emociones, convierto cada detalle en una
                
                historia emocional. La vida rural es lo más valioso que tenemos,
                en ella existe la raíz de nuestra esencia y cultura. Por ello
                quiero hacer crecer cualquier rincón rural en valor.
              </p>
              <Boton className="btn" aspecto="btn-2 fw-bold" valor="Saber más" />
            </Col>
            <Col md={6} className="image-col">
              <img
                src="/images/home.png"
                alt="imagen camino almendros en flor"
                className="img-fluid img-rounded-left"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-2 ">
      <Container>
        <Row className="text-center">
          <h2 className="mb-4 title">La autenticidad es tu mayor ventaja</h2>
          <Col md={4}>
          <i className="bi bi-flower1 fs-4"></i>
          <h3 className="h3-title">Conexión con la Tierra</h3>
          <p>
            Entemos el valor del proceso lento, la tradicción y los productos de cercanía. Lo plasmamos en cada texto
          </p>
          </Col>

           <Col md={4}>
          <i className="bi bi-chat-left-dots fs-4"></i>
          <h3 className="h3-title">Mensajes con Alma</h3>
          <p>
            Huimos del marketing vacío. Tu comunicación será tan genuina como tu trabajo diario. Palabaras que resuenan
          </p>
          </Col>

           <Col md={4}>
          <i className="bi bi-activity fs-4"></i>
          <h3 className="h3-title">Resultados Tangibles</h3>
          <p>
            Un buen <strong>copy</strong> no es solo bonito, es estratégico. Te ayudamos a traer, fidelizar y aumnetar tus ventas online.
          </p>
          </Col>
        </Row>
      </Container>
      </section>

      <section className="section-3">
        <Container>
          <Row className="aling-items-center d-flex justify-content-center">

              {/* Cuando tengamos foto cambiar */}
            <Col md={6} className="text-center pb-2" >
            <img className="w-75 img " src="/images/home.png" alt="" />
            </Col>

             <Col md={6} className="texto-home">
              <h2 className="fs-2 pb-2 fw-bold">Sumamos historias juntos...</h2>
              <p>
                Convierto las cosas en emociones, convierto cada detalle en una
                historia emocional. La vida rural es lo más valioso que tenemos,
                en ella existe la raíz de nuestra esencia y cultura. Por ello
                quiero hacer crecer cualquier rincón rural en valor.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-servicios">
        <Container>
          <Row className="justify-content-center">
            <h2 className="text-center fw-bold pt-4 title">Nuestras semillas de Copywriting</h2>
          <Col className="mb-4 d-flex justify-content-center"
          md={6} lg={4}
          >
          {services.map((servicio)=> {  
           return(
            <CardService
            service_id={servicio.service_id}
            name={servicio.service_name}
            description={servicio.service_description}
            image={servicio.service_image}
            />
         )
         })}
         </Col>
        </Row>
      </Container>   
      </section>
    </>
  );
};

export default Home;
