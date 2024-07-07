import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = () => {

     const { userInfo} = useSelector((state)=>state.login)
   

     

  return (
    <div>

    {
        userInfo ? <Outlet/> : <Navigate to={'/login'}/>
    }
      
    </div>
  )
}

export default PrivateRoutes
