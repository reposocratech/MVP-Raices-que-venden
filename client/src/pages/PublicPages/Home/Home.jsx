import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./home.css";
import { Boton } from "../../../components/Boton/Boton";
import CardService from "../../../components/cardService/CardService";
import { fetchData } from "../../../helpers/axiosHelper";
import NewsletterForm from "../../../components/newsletterForm/NewsletterForm";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchData("/getServices", "GET");
        const visibleServices = response.data.filter(service => service.is_visible === 1);
        console.log("esto es la respuesta del backkkk", response.data)
        setServices(visibleServices);

      } catch (error) {
        console.log(error);
      }
    }
    fetchServices()
  }, []);
   
  return (

    <>
      

      <section className="home">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6} className="texto-home px-5">
              <h1 className="h1-home">Raíces que Venden</h1>
              <p className="h5">Copywriting rural con alma · By Almuyalma</p>
              <p>
                Convierto las cosas en emociones, convierto cada detalle en una
                
                historia emocional. La vida rural es lo más valioso que tenemos,
                en ella existe la raíz de nuestra esencia y cultura. Por ello
                quiero hacer crecer cualquier rincón rural en valor.
              </p>
              <div className="btn-home">
                <Button className="btn" onClick={()=> navigate('/contact')} >Contactar</Button>
              </div>
            
            </Col>
            <Col md={6} className="image-col">
              <img
                src="/images/home.png"
                alt="imagen camino almendros en flor"
                className="img-fluid "
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-2 ">
      <Container>
         <h2 className="mb-4 title text-center">La autenticidad es tu mayor ventaja</h2>
        <Row className="text-center">
         
          <Col md={4}>
          <i className="bi bi-flower1 fs-4 icono"></i>
          <h3 className="h3-title">Conexión con la Tierra</h3>
          <p className="p-text">
            Entemos el valor del proceso lento, la tradicción y los productos de cercanía. Lo plasmamos en cada texto
          </p>
          </Col>

           <Col md={4}>
          <i className="bi bi-chat-left-dots fs-4 icono"></i>
          <h3 className="h3-title">Mensajes con Alma</h3>
          <p className="p-text">
            Huimos del marketing vacío. Tu comunicación será tan genuina como tu trabajo diario. Palabaras que resuenan
          </p>
          </Col>

           <Col md={4}>
          <i className="bi bi-activity fs-4 icono"></i>
          <h3 className="h3-title">Resultados Tangibles</h3>
          <p className="p-text">
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
            <img className="w-75 img " src="/image/almu7.jpg" alt="" />
            </Col>

             <Col md={6} className="texto ">
              <h2 className="pb-2 fw-bold">Sumamos historias juntos...</h2>
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
           <h2 className="text-center fw-bold pt-4 title">Nuestras semillas de Copywriting</h2>
          <Row lg={4} className="justify-content-center">
           
          {services.map((servicio)=> {  
           return(
            <Col className="mb-4 d-flex justify-content-center"
           key={servicio.service_id}
          >
            <CardService
            
            service_id={servicio.service_id}
            name={servicio.service_name}
            description={servicio.service_description}
            image={servicio.service_image}

            />
          </Col>
         )
         })}
         
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
