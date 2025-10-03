import React from 'react'
import { NavbarUser } from '../components/NavbarApp/NavbarUser/NavbarUser'
import FooterApp from '../components/FooterApp/FooterApp';
import './publicLayout.css'
import { Outlet } from 'react-router-dom';


export const UserLayout = () => {
  return (
   <>
   <header>
    <NavbarUser/>
   </header>
   <main className='main-layout'>
    <Outlet/>
   </main>
   <footer>
    <FooterApp/>
   </footer>
   </>
  )
}
