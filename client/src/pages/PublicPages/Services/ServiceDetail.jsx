import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './serviceDetail.css';
import { Boton } from '../../../components/Boton/Boton';
import { AuthContext } from '../../../context/AuthContextProvider';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getService = async () => {
      try {
        const result = await fetchData(`/getService/${id}`, 'GET');
        setService(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getService();
  }, [id]);

  return (
    <section className="section-service">
      <Container fluid className="service-detail">
        <Row className="text-center header-section-service">
          <h2 className="title-service mb-5 h1">
            Servicios para impulsar tu negocio
          </h2>
        </Row>

        <Row className="file-service d-flex justify-content-center align-items-center text-center mx-3">
          <Col
            md={6}
            className="card-service-unic text-center justify-content-center"
          >
            <img
              className="img-service-unic"
              src={`${import.meta.env.VITE_SERVER_IMAGES}/services/${
                service.service_image
              }`}
              alt=""
            />
            <h2 className="h2-service-unic pt-3">{service.service_name}</h2>

            <div className="description-service-unic d-flex flex-column justify-content-center align-items-center">
              <p>{service.service_description}</p>
              {service.service_price && (
                <p className="price-service h5">
                  Precio: {service.service_price} €
                </p>
              )}
              <Boton
                onClick={() => navigate(-1)}
                valor="Volver atrás"
                aspecto="btn-3  mt-3"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceDetail;
