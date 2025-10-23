import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Boton } from '../../../../components/Boton/Boton';
import './login.css'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContextProvider';
import { fetchData } from '../../../../helpers/axiosHelper';


const initialValue = {
  email:"",
  password: ""
}

const Login = () => {

  const { setUser, setToken } = useContext(AuthContext)

  const [ login, setLogin ] = useState(initialValue);
  const [showPass, setShowPass] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
  }

  const onSubmit = async(e) => {
    e.preventDefault();
      setErrMsg('')

      try {
        e.preventDefault();

        const res = await fetchData('/user/login', 'POST', login);
        const token = res.data.token;
        localStorage.setItem("token", token); //guardar token

        //petición al back para traer datos
        const resUser = await fetchData('/user/getUserToken', 'GET', null, token);
        setToken(token);
        setUser(resUser.data.user);
        
        console.log(resUser)

      } catch (error) {

        if(error.response?.data?.message === 'Email no registrado'){
          setErrMsg('Este correo no está registrado')
        }else if(error.response?.data?.message === 'Contraseña incorrecta'){
          setErrMsg('La contraseña no es correcta');
        }else{
          setErrMsg('Error al iniciar sesión, inténtalo de nuevo')
        }
        console.log(error)
      }
  }


  return (
     <Container className='contenedor-login'>
      <div className='div-log'>
        <form className='login'>
          <h2>Iniciar sesión</h2>
          <hr />
          <div className='input-div'>
            <label htmlFor="email">Correo</label>
            <input 
              id='email' 
              type="text"
              name='email'
              value={login.email}
              onChange={handleChange}
              />
          </div>
          <div className='input-div'>
            <label htmlFor="password">Contraseña</label>
            <div className='div-pass'>
              <input
                id='password'
                type={showPass ? 'text' :'password'} 
                name='password'
                value={login.password}
                className='w-100'
                onChange={handleChange}
                 />
                 <i 
                    onClick={() => setShowPass(!showPass)}  
                    className={showPass ? "bi bi-eye" :  "bi bi-eye-slash"}></i>
            </div>
          </div>
          { errMsg && <p className='text-danger mt-2'>{errMsg}</p>}
          
          <div className='btn-div'>
           
            <Boton
              aspecto="btn-3 w-100"
              valor="Acceder"
              onClick={onSubmit}
            />
          </div>
          <div className='link-sesion'>
            <p>¿Aún no estás registrado? <Link to={'/register'} className='register-link'>Regístrate aquí</Link></p>
          </div>
        
        </form>
      </div>
    </Container>
  )
}




export default Login;
