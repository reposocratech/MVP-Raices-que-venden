import React, { useState } from 'react'
import { NavbarUser } from '../components/NavbarApp/NavbarUser/NavbarUser'
import FooterApp from '../components/FooterApp/FooterApp'
import './layout.css'
import { Outlet } from 'react-router-dom'
import { Boton } from '../components/Boton/Boton'
import { Container } from 'react-bootstrap'
import { PopChat } from '../components/PopChat/PopChat'


export const UserLayout = () => {
  const [showChat, setShowChat] = useState(false)



  return (
   <>
   <header>
    <NavbarUser/>
   </header>
    <main className='main-layout'>
      <Outlet/>
      <Container>
        <Boton
          aspecto="btn-2 btn-chat"
          valor="¿Chateamos?"
          icon='bi bi-chat-dots'
          onClick={() => setShowChat(!showChat)}
        />
        {showChat && <PopChat /> }
      </Container>
    </main>
   <footer>
    <FooterApp/>
   </footer>
   </>
  )
}
