import React from 'react'
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../../helpers/axiosHelper';
import { useState } from 'react';

const Confirm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const {token} = useParams();

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
            <h2>Cuenta verificada</h2>
            :
            <h2>Nanai</h2>
            }
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Confirm;