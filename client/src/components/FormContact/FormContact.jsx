import React from 'react'
import './formcontact.css'
import { Boton } from '../Boton/Boton'


export const FormContact = () => {
  return (
     <form className="contact">
            <div className='input-div'>
                <label htmlFor="">Nombre</label>
                <input
                  type="text"

                  />
            </div>
            <div className='input-div'>
                <label htmlFor="">Correo</label>
                <input
                  type="text"


                  />
            </div>
            <div className='input-div'>
                <label htmlFor="">Nombre de tu proyecto</label>
                <input
                  type="text"

               
                  />
            </div>
            <div className='input-div'>
                <label htmlFor="">Cuéntanos tu historia y tus necesidades</label>
                <textarea
                  className='texts'
                  type="text"

              
                  />
            </div>

            <div className=' pt-4 d-flex justify-content-center'>
              <Boton
                aspecto="btn-3 w-25"
                valor='Enviar'
              />
            </div>
        </form>
  )
}
