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
              Si eres emprendedor o empresa rural y quieres posicionarte en el mundo digital con una voz única, me encantará escucharte. Porque vender desde las raíces no solo es posible, es necesario.
            </p>
            <p>
              Educación: BIG school Ubicación: España · 180 contactos en LinkedIn. Mira el perfil de Almudena Torres López en LinkedIn, una red profesional de más de 1.000 millones de miembros.
            </p>
              <p><i class="bi bi-envelope-at"></i>        almuyalma.raices@gmail.com
              </p>
              <p>
                <i class="bi bi-whatsapp"></i>        +34-658748225
              </p>
               <div className="col d-flex justify-content-center mb-2">
              <a href="https://www.instagram.com/almuyalma.copy" className="textIcon mx-4">
                <i
                  className="bi bi-instagram "
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
              <a href="https://www.facebook.com/" className="textIcon mx-4">
                <i
                  className="bi bi-facebook "
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
              <a href="https://www.linkedin.com/in/almudenatorreslopez" className="textIcon mx-4">
                <i
                  className="bi bi-linkedin "
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
              
            </div>
            </div>
            <img className='imgAlmu' src="/image/almu5.jpg" alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact;
