import React from 'react'
import { NavbarApp } from '../components/NavbarApp/NavbarPublic/NavbarPublic'
import FooterApp from '../components/FooterApp/FooterApp'
import { Outlet } from 'react-router-dom'
import './publicLayout.css'

export const PublicLayout = () => {
  return (
    <>
    {/* Encabezado */}
    <header>
      <NavbarApp/>
    </header>
    {/* Cuerpo */}
    <main className='main-layout'>
      <Outlet/>
    </main>
    {/* Footer */}
    <footer>
      <FooterApp/>
    </footer>
    </>
  )
}
