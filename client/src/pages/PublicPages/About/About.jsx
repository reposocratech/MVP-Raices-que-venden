import { Col, Container, Row } from 'react-bootstrap';
import './about.css'
import { useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
        <img src="/image/almu.png" alt="" />
        <p>
          “Contar la historia de un pueblo es mantener vivo su futuro. Y esa es mi misión.”
        </p>
        </Col>
        <Col>
        <h2>Una historia con raízes</h2>
        <p>
          Soy Almudena Torres López y detrás de Raíces que Venden no hay una gran agencia, ni un gran equipo. Hay una sola persona: yo, con mis manos, mis palabras y toda mi ilusión al servicio de tu negocio.
Mi historia comienza en Mondéjas (Guadalajra, Castilla-La Mancha), un pueblo pequeño que me enseñó desde niña el valor de lo auténtico, lo cercano y lo rural. 
Hoy vivo en tierras valecianas, entre naranjos, tradiciones y la calidez de la gente de Castellón y de toda la Comunitat Valenciana.
Desde aquí, acompaño a negocios rurales y locales de toda España, porque un queso manchego, un aceite de Jaén o una casa rural en Galicia... todos ellos merecen palabras que los hagan brillar.
        </p>
        </Col>
      </Row>
    </Container>
  )
}


export default About;