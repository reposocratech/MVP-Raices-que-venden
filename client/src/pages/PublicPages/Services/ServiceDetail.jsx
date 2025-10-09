import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './serviceDetail.css'

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState([]);


    useEffect(() => {
        const getService = async () => {
            try {
                const result = await fetchData(`/getService/${id}`, "GET")
                setService(result.data);

            } catch(error) {
                console.log(error);
            }
        }
        getService();
    }, [id]);


  return (
    <section className='section-service'>
    <Container fluid className='service-detail'>
         <Row className='text-center header-section-service'>
             <h2 className='title-service'>Servicios para impulsar tu negocio</h2>
         </Row>
        
        <Row className='file-service d-flex justify-content-center align-items-center text-center'>
            
            <Col md={6} className='card-service-unic text-center justify-content-center'>
            <h2>{service.service_name}</h2>
            <p>{service.service_description}</p>
            {service.service_price && (
            <p>Precio: {service.service_price}</p>
            )}
           
            </Col>
        </Row>
    </Container>
    </section>
  )
}

export default ServiceDetail;