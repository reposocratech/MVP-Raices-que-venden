import React from 'react'
import './footer.css'
import { Col, Row } from 'react-bootstrap';

const FooterApp = () => {
  return (
    <>
    <footer className='footer-padre'>
    <div className='container'>
    <div className='row justify-content-center mb-2'>
      <div className='col d-flex justify-content-center mt-3 mb-2'>
        <a>
            <i class="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
            </a>
            <a className="text-white mx-4">
              <i class="bi bi-facebook" style={{ fontSize: '1.5rem' }} ></i>
            </a>
            <a>
              <i class="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
            </a>
      </div>
       <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <p className="mb-1">© 2025 Raíces que Venden · Almuyalma</p>
            <p className="mb-2">Desde Castellón y la terreta, para toda España.</p>
          </div>
        </div>
      </div>

    </div>
    
   
     
     </footer>
    </>
  )
}

export default FooterApp;