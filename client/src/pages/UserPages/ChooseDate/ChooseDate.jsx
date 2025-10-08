import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import MyCalendar from "../MyCalendar/MyCalendar";
import './chooseDate.css'

const ChooseDate = () => {
  return (
    <div>
        <Container className='titulo-citas'>
        <h2>Elige tu cita</h2>
        <hr />
        <Row className='container-choose'>
            <Col> 
            <MyCalendar />
            </Col>
        </Row>
           
        </Container>
    </div>
  )
}
export default ChooseDate