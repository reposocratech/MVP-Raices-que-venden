import { lazy, Suspense, useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'




//importacion de las rutas publicas
import { PublicRoutes } from './PublicRoutes'
import { PublicLayout } from '../layouts/PublicLayout'

const Home = lazy(() => import('../pages/PublicPages/Home/Home'));
const About = lazy (() => import ('../pages/PublicPages/About/About'));
const Login = lazy (() => import('../pages/PublicPages/Auth/Login/Login'));
const Register = lazy (() => import('../pages/PublicPages/Auth/Register/Register'));
const Confirm = lazy(() => import('../pages/PublicPages/Confirm/Confirm'));
const Contact = lazy (() => import('../pages/PublicPages/Contact/Contact'));
const Services = lazy (() => import('../pages/PublicPages/Services/Services'));
const Shop = lazy(() => import('../pages/PublicPages/Shop/Shop'));
const ErrorPage = lazy(() => import('../pages/PublicPages/ErrorPage/ErrorPage'));
const ServiceDetail = lazy(() => import('../pages/PublicPages/Services/ServiceDetail'))


//RUTAS PRIVADAS
import { PrivateRoutes } from './PrivateRoutes';
//importacion de las rutas de User

import { UserLayout } from '../layouts/UserLayout';

const MyOrders = lazy(() => import('../pages/UserPages/MyOrders/MyOrders'));
const MyAppointments = lazy(() => import('../pages/UserPages/MyAppointments/MyAppointments'))
const MyProfile = lazy(() => import('../pages/UserPages/MyProfile/MyProfile'));
const MyTexts = lazy(() => import('../pages/UserPages/MyTexts/MyTexts'));
const MyTextPreview = lazy(() => import('../pages/UserPages/MyTextPreview/MyTextPreview'));
const ChooseDate = lazy(() => import('../pages/UserPages/ChooseDate/ChooseDate'));


//importacion de las ruta de Admin
import { AdminLayout } from '../layouts/AdminLayout';

const AdminMessage = lazy(() => import('../pages/AdminPages/AdminMessage/AdminMessage'));


const AdminOrders = lazy(() => import('../pages/AdminPages/AdminOrders/AdminOrders'));
const Appointments = lazy(() => import('../pages/AdminPages/Appointments/Appointments'));
const Horarios = lazy(() => import('../pages/AdminPages/Horarios/Horarios'));
const AdminUsers = lazy(() => import('../pages/AdminPages/AdminUsers/AdminUsers'));
const AdminService = lazy(() => import('../pages/AdminPages/AdminService/AdminService'));
const Dashboard = lazy(() => import('../pages/AdminPages/Dashboard/Dashboard'));

const WriterUsers = lazy(() => import('../pages/AdminPages/Writer/Users/WriterUsers'));
const WriterEditor = lazy(() => import('../pages/AdminPages/Writer/Writer/WriterEditor'));
const WriterTexts = lazy(() => import('../pages/AdminPages/Writer/Texts/WriterTexts'));


export const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  /* console.log("Desde el AppRoutes" , user) */

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>

          {/* Rutas publicas */}
          <Route element={<PublicRoutes user={user}/>} >
            <Route element={<PublicLayout/>} >
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/contact' element={<Contact/>}/>
              {/* Servicios dinamicos??? */}
              <Route path='/services' element={<Services/>}/>
              {/* <Route path='/shop' element={<Shop />} /> */}
              <Route path='/confirm/:token' element={<Confirm />} />
              <Route path='/service/:id' element={<ServiceDetail />} />
            </Route>
          </Route>

          {/* Rutas User */}
          <Route element={<PrivateRoutes user={user} requiredType={2} />}>
            <Route element={<UserLayout />}>
              <Route path='/user' element={<Home/>}/>
              {/* Servicios dinamicos??? */}
              <Route path='/user/services' element={<Services user={user}/>}/>
              <Route path='/user/about' element={<About/>} />
              {/* <Route path='/user/shop' element={<Shop />} /> */}
              <Route path='/user/myorders' element={<MyOrders />} />
              <Route path='/user/texts' element={<MyTexts/>}/>
              <Route path='/user/textPreview/:text_id' element={<MyTextPreview/>}/>
              <Route path='/user/contact' element={<Contact/>}/>
              <Route path='/user/chooseDate' element={<ChooseDate/>} />
              <Route path='/user/myAppointments' element={<MyAppointments />} />
              <Route path='/user/profile' element={<MyProfile/>}/>
              <Route path='/user/service/:id' element={<ServiceDetail />} />
            </Route>
          </Route>

          {/* Rutas Admin */}
          <Route element={<PrivateRoutes user={user} requiredType={1}  />}>
            <Route element={<AdminLayout />}>
             <Route path='/' element={<Home/>}/>
              <Route path='/admin/write' element={<WriterUsers />} />
              <Route path='/admin/write/texts/:user_id' element={<WriterTexts />} />
              <Route path='/admin/write/editor/:text_id' element={<WriterEditor />} />
              <Route path='/admin/message' element={<AdminMessage />}/>
              {/* <Route path='/admin/dashboard' element={<Dashboard/>}/> */}
              <Route path='/admin/services' element={<AdminService />}/>
              <Route path='/admin/users' element={<AdminUsers/>} />
              <Route path='/admin/horarios' element={<Horarios />} />
              <Route path='/admin/appointments' element={<Appointments />} />
              {/* <Route path='/admin/orders' element={<AdminOrders />} /> */}
            </Route>
          </Route>



          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
