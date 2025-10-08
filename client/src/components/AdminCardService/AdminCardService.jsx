import React, { useState } from 'react'
import { Boton } from '../Boton/Boton'

import './adminCardService.css'

export const AdminCardService = ({name, description, image=null, price=null, category=null, is_visible, alterVisible, modify, deleteService}) => {
  const [visible, setVisible] = useState(is_visible);

  const changeVisible = async () => {
    alterVisible()
    setVisible(!visible);
  }

  return (
    <>
      <div className={`admin-card-service mb-3`}>
        <img src={image? `${import.meta.env.VITE_SERVER_IMAGES}/services/${image}`:null} alt="image service" className={`card-img ${visible?null:'card-img-blur'}`} />
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="d-flex gap-3 justify-content-between">
            <h4>{price?price:'sin precio'}</h4>
            {category?
              <Boton aspecto='btn-1' valor='Post' onClick={null} />
            :null}
        </div>
        <Boton onClick={changeVisible} icon={visible ? "bi bi-eye" : "bi bi-eye-slash"} aspecto='btn-rounded-2 btn-visible' />
      </div>
    <div className='d-flex justify-content-between'>
      <Boton aspecto='btn-rounded-2 btn-card' valor='25 post'/>
      <Boton onClick={modify} icon="bi bi-pen" aspecto='btn-rounded-ok btn-card btn-edit' />
      <Boton onClick={deleteService} icon="bi bi-trash" aspecto='btn-rounded-err btn-card btn-delete' />
    </div>
    </>
  )
}
