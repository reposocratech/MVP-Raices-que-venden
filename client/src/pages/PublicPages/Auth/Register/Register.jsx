import { Container, Row, Col } from 'react-bootstrap';
import './register.css';
import { Boton } from '../../../../components/Boton/Boton';

const Register = () => {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <form className='w-50 register-form'>
        <h2>Registrar</h2>
        <hr />
        <div className='input-div'>
          <label htmlFor="email">Correo</label>
          <input id='email' type="text" />
        </div>
        <div className='input-div'>
          <label htmlFor="password">Contraseña</label>
          <input id='password' type="text" />
        </div>
        <div className='input-div'>
          <label htmlFor="repetirPassword">Repetir Contraseña</label>
          <input id='repetirPassword' type="text" /> 
        </div>
        <div className='check-input'>
          <div>
            <input type="checkbox" />
            <label htmlFor="privacity">Accepto la política de privacidad</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="newslatter">Suscribirme a la newslatter personalizada</label>
          </div>
        </div>
        <div className='req-zod'>
          <Row lg={3}>
            <Col>
              <p>Contraseñas iguales</p>
              <p>Más de 8 caracteres</p>
            </Col>
            <Col>
              <p>Mínimo 1 Símbolo</p>
              <p>Mínimo 1 Número</p>
            </Col>
            <Col>
              <p>Mínimo 1 Mayúscula</p>
              <p>Mínimo 1 Minúscula</p>
            </Col>
          </Row>
        </div>
        <Row className='btn-div' lg={2}>
          <Boton
            valor="Cancelar"
            aspecto="btn-err-1"
          />
          <Boton
            aspecto="btn-3"
            valor="Registrar"
          />
        </Row>
        
      </form>
    </Container>
  )
}


export default Register;