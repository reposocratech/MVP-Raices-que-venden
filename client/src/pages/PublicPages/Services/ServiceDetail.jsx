import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

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
    <>
    <Container className='service-detail py-5'>
        <Row className='d-flex justify-content-center align-items-center text-center'>
            <h2 className='text-center mt-4'>Servicios para impulsar tu negocio</h2>
            <Col md={6} className='card text-center mb-4 mt-4 justify-content-center'>
            <h2>{service.service_name}</h2>
            <p>{service.service_description}</p>
            {service.service_price && (
            <p>Precio: {service.service_price}</p>
            )}
           
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default ServiceDetail;