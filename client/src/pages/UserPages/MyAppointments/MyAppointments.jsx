import React from 'react'
import { useContext } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from '../../../helpers/axiosHelper';
import { useEffect } from 'react';
import { useState } from 'react';
import './myAppointments.css'


const MyAppointments = () => {
    const { token } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);

    const loadAppointments = async () => {
        try {
            const result = await fetchData('/appointment/myAppointments', 'GET', null, token)
            console.log("citas recibidas", result.data.citas)
            setAppointments(result.data.citas)

        } catch (error) {
            console.log("Error al cargar citas: " , error)
        }
    };

    useEffect(() => {
        loadAppointments()
    }, []);
    
    return (
        <>
        <Container className="py-4">
      <h2 className="title-app mb-4">Mis citas</h2>
      <hr />
      {appointments.length === 0 ? (
        <p>No tienes citas confirmadas.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {appointments.map((e) => (
            <Col key={e.appointment_2_id}>
              <Card className="appointment-card shadow-sm border-0 h-100">
                <Card.Body>
                  <Card.Title className="mb-2">🗓️ {e.app_date}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    🕒 {e.app_hour}:00 - {e.app_hour + 1}:00
                  </Card.Subtitle>
                  <Card.Text className="text-success fw-bold">
                    ✅ Confirmada
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>

        </>
    )
}

export default MyAppointments;