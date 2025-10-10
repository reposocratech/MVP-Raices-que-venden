import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import CardService from "../../../components/cardService/CardService";
import { fetchData } from "../../../helpers/axiosHelper";
import CardServiceUser from "../../../components/cardService/CardServiceUser";
import './serviceDetail.css'


const Services = () => {

  
  const [services, setServices] = useState([]);


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
  )
}

export default Services;