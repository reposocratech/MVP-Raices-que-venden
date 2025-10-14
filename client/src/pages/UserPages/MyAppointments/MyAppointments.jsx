import React from 'react'
import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from '../../../helpers/axiosHelper';
import { useEffect } from 'react';
import { useState } from 'react';


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
        <Container>
            <div>
        <h2>Mis citas</h2>
        <hr />
        {appointments.length === 0 ? (
            <p>No tienes citas confirmadas.</p>
        ) : ( 
            appointments.map(e => (
                <Row key={e.appointment_2_id}>
                    <Col lg={3}> <p className='m-0'> 🗓️ {e.app_date}</p> </Col>
                    <Col lg={3}> <p className='m-0'> 🕒 {e.app_hour}:00 - {e.app_hour + 1}:00</p></Col>
                    <Col lg={3}> <p className='app-text'> Confirmada </p></Col>
                </Row>
            ))
        )

        }

           </div>

        </Container>  
        </>
    )
}

export default MyAppointments;