import React, { useState } from 'react'
import { CardServices } from '../../../components/cardServices/CardServices';

const services = [{
  id: 1,
  tittle: 'email',
  description: 'dsds',
  img: 'https://images.unsplash.com/photo-1682336869523-2c6859f781cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
},
{
  id: 2,
  tittle: 'email',
  description: 'dsds',
  img: 'https://images.unsplash.com/photo-1682336869523-2c6859f781cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
},
{
id: 3,
  tittle: 'email',
  description: 'dsds',
  img: 'https://images.unsplash.com/photo-1682336869523-2c6859f781cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
}

]

const Services = () => {

  const [ service, setService ] = useState(services);

  return (
    <section>
    <CardServices data={services} />
    </section>
  )
}


export default Services;
