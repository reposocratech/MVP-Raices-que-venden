import React from 'react'
import {Outlet} from 'react-router-dom'
import { NavbarAdmin } from '../components/NavbarApp/NavbarAdmin/NavbarAdmin'

export const AdminLayout = () => {
  return (
    <>
      <header>
        < NavbarAdmin />
      </header>
      <main>
        < Outlet />
      </main>
    </>
  )
}
