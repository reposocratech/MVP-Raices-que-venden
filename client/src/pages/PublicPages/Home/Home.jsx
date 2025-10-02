import React from 'react'
import './home.css'


const Home = () => {
  return (
    
      <section className='home'>
        <div className='home-container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-6'>
              <h1 className='h1-ppal'>Raíces que venden</h1>
              <h4>Copywriting rural con alma · By Almuyalma</h4>
              <p>Convierto las cosas en emociones, convierto cada 
              detalle en una historia emocional. La vida rural es lo 
              más valioso que tenemos, en ella existe la raíz de nuestra 
              esencia y cultura. Por ello quiero hacer crecer cualquier rincón rural en valor. </p>
            <a href="#vermas" className='btn btn-size btn-outline-dark'>Saber más</a>
            </div>
          </div>
          <div className='col-md-6 d-none d-sm-block'>
            <img 
            src="/images/home.png"
            alt="imagen camino almendros en flor"
            className='img-fluid img-rounded-left'

            />

          </div>


        </div>
      </section>
    
  )
}

export default Home;
