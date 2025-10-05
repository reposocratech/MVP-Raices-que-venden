import  { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PrivateRoutes = ({user, requiredType}) => {

  const navigate = useNavigate();

  /* console.log("Desde el PrivateRoutes" , user) */

  useEffect(() => {
    if (user?.type !== requiredType) {
      navigate('/');
    }
  })

  return (
    <>
      <Outlet />
    </>
  )
}
