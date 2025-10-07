import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./home.css";
import { Boton } from "../../../components/Boton/Boton";
import CardService from "../../../components/cardService/CardService";
import { fetchData } from "../../../helpers/axiosHelper";
import NewsletterForm from "../../../components/newsletterForm/NewsletterForm";

const Home = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchData("/getServices", "GET");
        console.log("esto es la respuesta del backkkk", response.data)
        setServices(response.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchServices()
  }, []);
   
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

      <section className="section-2">
        <Container>
          <Row className="aling-items-center">
            <Col md={6} className="texto-home">
              <h2 className="fs-2 pb-2">Sumamos historias juntos...</h2>
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
          <Row className="justify-content-centr">
          <Col className="mb-4 d-flex justify-content-center"
          md={6} lg={4}
          >
          {services.map((servicio)=> {  
           return(
            <CardService
            key={servicio.service_id}
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
      <section className="newsletter-section">
        <Container>
          <Row>
            <Col md={12}>
            <NewsletterForm />      
            </Col>
          </Row>
        </Container>

      </section>
    </>
  );
};

export default Home;
