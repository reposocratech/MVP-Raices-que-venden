import React from 'react'
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchData } from '../../../helpers/axiosHelper';
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './confirm.css'
import { Boton } from '../../../components/Boton/Boton';

const Confirm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const {token} = useParams();
  const navigate = useNavigate();

  useEffect( ()=>{
    const checkConfirmed = async () => {
      try {
        const result = await fetchData('/userConfirm', 'PUT', null, token);
      console.log(result, '*******');
      const {is_validated} = result.data;
      console.log(is_validated);
      if(is_validated === 1){
        setIsValidated(true);
      }
      } catch (error) {
        console.log(error);
      }
      
    }
    checkConfirmed();
    
  }, [isValidated])

  return (
    <>
      <section>
        <Container>
          <Row>
            {isValidated ? 
            <div className='confirm'>
              <h2>Cuenta verificada</h2>
              <DotLottieReact
                className='icon'
                src="https://lottie.host/41026884-d44f-44a4-b1f0-18414c20964f/IvDu9ONP7t.lottie"
                autoplay
              />
              <Boton
                aspecto="btn-2"
                icon="bi bi-box-arrow-in-right"
                valor="Iniciar sesión"
                onClick={() => navigate("/login")}
              />
             </div>
            :
            <div className='confirm'>
            <div className='text'>
              <h2>¡Algo ha salido mal!</h2>
              <h3>Comprueba de nuevo su correo o vuelva a registrar</h3>
            </div>
            <DotLottieReact
              className='icon'
              src="https://lottie.host/dd224733-412c-4467-a09b-a33fb94629ea/aek7AvsaOU.lottie"
              loop
              autoplay
            />
            <Boton
              aspecto="btn-1"
              valor="Registrar"
              onClick={() => navigate("/register")}
            />
           </div>
            }
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Confirm;