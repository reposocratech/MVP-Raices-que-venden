import React from 'react'
import { NavbarUser } from '../components/NavbarApp/NavbarUser/NavbarUser'
import FooterApp from '../components/FooterApp/FooterApp'


export const UserLayout = () => {
  return (
   <>
   <header>
    <NavbarUser/>
   </header>
   <footer>
    <FooterApp/>
   </footer>
   </>
  )
}
