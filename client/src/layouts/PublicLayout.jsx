import React from 'react'
import { NavbarApp } from '../components/NavbarApp/NavbarPublic/NavbarPublic'
import FooterApp from '../components/FooterApp/FooterApp'
import { Outlet } from 'react-router-dom'

export const PublicLayout = () => {
  return (
    <>
    <header>
      <NavbarApp/>
      </header>
 
    <footer>
      <FooterApp/>
      </footer>
    </>
  )
}
