import { lazy, Suspense } from 'react'
import { AuthContext } from '../context/AuthContextProvider'


//importacion de las rutas publicas
import { PublicRoutes } from './PublicRoutes'
import { PublicLayout } from '../layouts/PublicLayout'
const Home = lazy(() => import('../pages/PublicPages/Home/Home'));
const About = lazy (() => import ('../pages/PublicPages/About/About'));
const Login = lazy (() => import('../pages/PublicPages/Auth/Login/Login'));
const Register = lazy (() => import('../pages/PublicPages/Auth/Register/Register'));
const Contact = lazy (() => import('../pages/PublicPages/Contact/Contact'));
const Services = lazy (() => import('../pages/PublicPages/Services/Services'));
const ErrorPage = lazy(() => import('../pages/PublicPages/ErrorPage/ErrorPage'));

//importacion de las rutas privadas


//importacion de las ruta de Admin

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>

          {/* Rutas publicas */}
          <Route element={<PublicRoutes/>} >
            <Route element={<PublicLayout/>} >
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/services' element={<Services/>}/>
            </Route>
          </Route>




          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
