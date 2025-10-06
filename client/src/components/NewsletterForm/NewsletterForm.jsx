import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Boton } from "../Boton/Boton";

const NewsletterForm = () => {
  return (
    <>
    <Container className="d-flex justify-content-center my-5">
        <Row className="justify-content-center">
            <Col> 
      <Card className="p-4 mb-4 shadow-sm rounded-4">
        <Card.Body>
          <Card.Title className="p-3 text-center fs-4">
            Suscribete a la Newsletter
          </Card.Title>
          <Form action="#urlmailchimp" method="post">
            <Form.Group className="mb-3">
            <Form.Label>Nombre: </Form.Label>
            <Form.Control 
            type="text" 
            name="NAME" 
            placeholder="Tu nombre" 
            required 
            />
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                name="EMAIL"
                placeholder="Tu email"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
            <Boton aspecto="btn-3 text-center" type="submit" className="btn"
             valor="Quiero recibir mi regalo 🎁" />
           </div>
          </Form>
        </Card.Body>
      </Card>
     </Col>
    </Row>
    </Container>
    </>
  );
};

export default NewsletterForm;
