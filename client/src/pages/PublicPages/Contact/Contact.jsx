import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './contact.css'

const Contact = () => {
  return (
    <section className='section-contact'>
      <Container className="about">
        <h1>
          Hablemos y sembremos palabras juntos
        </h1>
        <Row className='div-row'>
          <Col className="about-img" sm={12} md={6}>
 
          </Col>
          <Col className="about-text" sm={12} md={6}>
          
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact;
