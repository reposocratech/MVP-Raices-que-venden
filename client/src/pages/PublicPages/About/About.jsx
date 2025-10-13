import { Col, Container, Row } from 'react-bootstrap';
import './about.css';

const About = () => {
  return (
    <section className='section-about'>
      <Container className="about">
        <h1>
          Conoce a Almudena: La Esencia de Almuyalma
        </h1>
        <Row className='div-row'>
          <Col className="about-img" sm={12} md={6}>
            <img src="/image/almu2.jpg" alt="" />
            <p>
              “Contar la historia de un pueblo es mantener vivo su futuro. Y esa
              es mi misión.”
            </p>
          </Col>
          <Col className="about-text" sm={12} md={6}>
            <h2>Una historia con raízes</h2>
            <p>
              <span className='fw-semibold'>Almuyalma</span> nace de la convicción de que la <span className='fw-semibold'>historia y la identidad</span> de un proyecto rural son su activo más valioso. Soy Almudena y mi compromiso es traducir la pasión que pones en tu tierra y tu oficio con textos que resuenen con tu público.
            </p>
            <p>
              "Creo que el <span className='fw-semibold'>copywriting</span> que tiene raíces, que horna la tradición y que está firmemente orientado a un futuro sostenible para el entorno rural. Trabajamos con el alma para sembrar palabras que florecen en ventas"
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
