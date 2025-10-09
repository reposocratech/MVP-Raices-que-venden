import React, { useState } from 'react'
import './formcontact.css'
import { Boton } from '../Boton/Boton'
import { fetchData } from '../../helpers/axiosHelper'

export const FormContact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    company_name: '',
    user_description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await fetchData('/emailcontact', 'POST', formData)
      if (result.status === 200) {
        alert('Mensaje enviado correctamente')
        setFormData({
          user_name: '',
          email: '',
          company_name: '',
          user_description: ''
        })
      }
    } catch (error) {
      console.error(error)
      alert('Hubo un error al enviar el mensaje')
    }
  }

  return (
    <form className="contact" onSubmit={handleSubmit}>
      <div className='input-div'>
        <label>Nombre</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-div'>
        <label>Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-div'>
        <label>Nombre de tu proyecto</label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />
      </div>

      <div className='input-div'>
        <label>Cuéntanos tu historia y tus necesidades</label>
        <textarea
          className='texts'
          name="user_description"
          value={formData.user_description}
          onChange={handleChange}
          required
        />
      </div>

      <div className='pt-4 d-flex justify-content-center'>
        <Boton
          aspecto="btn-3 w-25"
          valor='Enviar'
          type="submit"
        />
      </div>

    </form>
  )
}

