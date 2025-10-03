import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./home.css";
import { Boton } from "../../../components/Boton/Boton";

const Home = () => {
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
          <Row className="justify-content-center aling-items-center">
            <Col>
              <h2 class="servicios-title">Servicios</h2>
              <div class="servicio-card">
                <img
                  src=""
                  alt="Imagen del servicio"
                  class="card-img"
                />
                <div class="card-content">
                  <h3 class="card-title">Copywriting emocional</h3>
                  <p class="card-text">
                    Transformo tu mensaje en una historia que conecta con el
                    alma rural. Palabras que venden sin perder la esencia.
                  </p>
                  <a href="" class="card-button">
                    Ver más
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
