import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import MyCalendar from "../MyCalendar/MyCalendar";
import './chooseDate.css'

const ChooseDate = () => {
  return (
    <div>
        <Container className='titulo-citas'>
      
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