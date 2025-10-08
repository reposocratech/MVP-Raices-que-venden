import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Boton } from "../Boton/Boton";
import { fetchData } from "../../helpers/axiosHelper";
import { useState } from "react";
import './newsletterForm.css'

const NewsletterForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/newsletter", "POST", formData);

      if (response.status === 200){
        alert("¡Gracias por suscribirte!");
      } else {
        alert("Algo salió mal: " + response.statusText)
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <Container className="d-flex justify-content-center my-5">
        <Row className="justify-content-center">
            <Col> 
      <Card className="p-4 mb-4  rounded-4 card-newsletter">
        <Card.Body>
          <Card.Title className="p-3 title text-center">
            ¡Suscríbete y recibe un regalo!
          </Card.Title>
          <Card.Text className="text-center mx-md-5 mx-sm-1">
            Únete a nuestra newsletter y recibe consejos exclusivos de copywriting tural. Además, al suscribirte, te enviaremos un pequeño onsequio personalizado para tu negocio como agradecimiento por confiar en Almuyalma
          </Card.Text>
          <Form
          onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3 mx-md-5 mx-sm-1">
            <Form.Label className="label">Nombre: </Form.Label>
            <Form.Control 
            type="text" 
            name="name" 
            placeholder="Introduce tu nombre"
            value={formData.name}
            onChange={handleChange}
            required 
            />
          </Form.Group>
            <Form.Group className="mb-3 mx-md-5 mx-sm-1">
              <Form.Label className="label">Email: </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Introduce tu correo electrónico"
                value={formData.email}
                onChange={handleChange}
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
