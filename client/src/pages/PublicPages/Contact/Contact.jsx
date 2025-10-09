import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './contact.css'
import { FormContact } from '../../../components/FormContact/FormContact'

const Contact = () => {
  return (
    <section className='section-contact'>
      <Container className="container-contact">
        <h1>
          Hablemos y sembremos palabras juntos
        </h1>
        <Row className='div-row'>
          <Col className="formcontact" sm={12} md={6}>
            <FormContact/>
          </Col>
          <Col  sm={12} md={6}>
            <div className="contact-text">
              <h2>¿Necesitas una respuesta rápida?</h2>
              <p>
                Contáctanos directamente o síguenos para ver ejemplos de proyectos rurales que ya están floreciendo.
              </p>
              <p><i class="bi bi-envelope-at"></i>     almuyalma.raices@gmail.com
              </p>
              <p>
                <i class="bi bi-whatsapp"></i>        +34 658748225
              </p>
            </div>
            <img className='imgAlmu' src="/image/almu.png" alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact;
