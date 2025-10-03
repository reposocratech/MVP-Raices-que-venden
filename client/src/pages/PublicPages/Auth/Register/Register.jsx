import { Container, Row, Col } from 'react-bootstrap';
import './register.css';
import { Boton } from '../../../../components/Boton/Boton';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {ZodError} from 'zod'
import { registerUserSchema } from '../../../../schema/registerUserSchema';
import { fetchData } from '../../../../helpers/axiosHelper';

const inicialValue = {
  email:"",
  password:"",
  repetirPassword:""
}

const Register = () => {

  const navigate = useNavigate()

  const [text, setText] = useState(inicialValue);
  const [showPass, setShowPass] = useState(false);
  const [showPassRep, setShowPassRep] = useState(false);
  const [valorError, setValorError] = useState();
  const [errMsg, setErrMsg] = useState("");


  const handleChange = (e) => {
    const {name, value} = e.target;
    setText({...text, [name]:value})

  }

  const onSubmit = async  (e) => {
    e.preventDefault()
    try {
      registerUserSchema.parse(text);
      const res =  await fetchData('/user/register', 'POST', text );
      console.log(res)
      navigate('/login');

    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.issues.forEach((e) => {
          fieldErrors[e.path[0]] = e.message;
        })
        setValorError(fieldErrors);
        console.log(fieldErrors)
        setErrMsg("");
      }else if (error.response.data.errno === 1062) {
        setErrMsg("¡Este correo ya esta registrado!")
      }else {
        console.log("otro error" , error)
      }
    }
  }


  return (
    <Container className='contenedor-form'>
      <div className='div-form'>
        <form className='register-form'>
          <h2>Registrar</h2>
          <hr />
          <div className='input-div'>
            <label htmlFor="email">Correo</label>
            <input 
              id='email' 
              type="text"
              name='email'
              value={text.email}
              onChange={handleChange}
              />
          </div>
          <div className='input-div'>
            <label htmlFor="password">Contraseña</label>
            <div className='div-pass'>
              <input
                id='password'
                type={showPass ? "text" : "password"}
                name='password'
                value={text.password}
                className='w-100'
                onChange={handleChange}
                 />
                 <i 
                    onClick={() => setShowPass(!showPass)}  
                    className={showPass ? "bi bi-eye" :  "bi bi-eye-slash"}></i>
            </div>
          </div>
          <div className='input-div'>
            <label htmlFor="repetirPassword">Repetir Contraseña</label>
            <div className='div-pass'>
              <input
                id='repetirPassword'
                name='repetirPassword'
                value={text.repetirPassword}
                onChange={handleChange}
                type={showPassRep ? "text" : "password"}
                className='w-100'
              />
              <i  
                  onClick={() => setShowPassRep(!showPassRep)} 
                  className={showPassRep ? "bi bi-eye" :  "bi bi-eye-slash"} ></i>
            </div>
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
          <div className='btn-div'>
            <Boton
              valor="Cancelar"
              aspecto="btn-err-1 w-50"
              onClick={()=> navigate('/')}
            />
            <Boton
              aspecto="btn-3 w-100"
              valor="Registrar"
              onClick={onSubmit}
            />
          </div>
          <div className='link-sesion'>
            <p>¿Ya tienes una cuenta? <Link to={'/login'} className='register-link'>Iniciar sesión</Link></p>
          </div>
        
        </form>
      </div>
    </Container>
  )
}


export default Register;