import React from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import './cardService.css'
import { Boton } from '../Boton/Boton';

const CardService = ({service_id, name, description,image }) => {
    const navigate = useNavigate();


  return (
    <div className="card card-service mb-3 justify-content-between">
        
        <img src={image? `${import.meta.env.VITE_SERVER_IMAGES}/services/${image}`:null} alt="image service" className="card-img" />
        <p className='h5 pt-2 name-service'>{name}</p>
        <p className='description-card'>{description}</p>
        <div className="d-flex gap-3 justify-content-center">
            <Boton className='btn' aspecto='btn-3'valor='Saber más' onClick={()=>navigate(`/service/${service_id}`)}/>
            
            <Boton className='btn' aspecto='btn-3' valor='Contactar' onClick={()=>navigate("/contact")} />
            
        </div>

    </div>
  )
}

export default CardService;