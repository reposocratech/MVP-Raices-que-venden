import { Col, Container, Row } from "react-bootstrap";
import { obtenerHoras } from "../../../middlewares/diasyHorarios";

const posDayHours = [
  '1-1', 
  '1-2',
  '1-3',
  '1-4', 
  '1-5', 
  '1-6',
  '1-7',
  '1-8',
  '1-9',
  '1-10',
  '1-11',
  '2-1', 
  '2-2',
  '2-3',
  '2-4', 
  '2-5', 
  '2-6',
  '2-7',
  '2-8',
  '2-9',
  '2-10',
  '2-11',
  '3-1', 
  '3-2',
  '3-3',
  '3-4', 
  '3-5', 
  '3-6',
  '3-7',
  '3-8',
  '3-9',
  '3-10',
  '3-11',
  '4-1', 
  '4-2',
  '4-3',
  '4-4', 
  '4-5', 
  '4-6',
  '4-7',
  '4-8',
  '4-9',
  '4-10',
  '4-11',
  '5-1', 
  '5-2',
  '5-3',
  '5-4', 
  '5-5', 
  '5-6',
  '5-7',
  '5-8',
  '5-9',
  '5-10',
  '5-11']

  console.log(obtenerHoras("08:00","14:00","01:00"))

const Horarios = () => {
  

    
  return (
    <Container>
      <Row lg={5}>
        <Col>
          <p>Lunes</p>
        </Col>
        <Col>
          <p>Martes</p>
        </Col>
        <Col>
          <p>Miercoles</p>
        </Col>
        <Col>
          <p>Jueves</p>
        </Col>
        <Col>
          <p>Viernes</p>
        </Col>
      </Row>
      
    </Container>
  )
}

export default Horarios;