import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PublicRoutes = ({user}) => {
  const navigate = useNavigate();

  console.log("Desde el PublicRoutes" , user)

  useEffect(() => {
    if(user){
      if (user.type === 1) navigate("/admin/dashboard");
      if (user.type === 2) navigate('/user/profile');
    }
  },[user])
  return (
    <>
    <Outlet/>
    </>
  )
}
