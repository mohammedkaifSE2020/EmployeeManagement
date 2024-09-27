import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function PrivateRoute() {
    const user = useSelector((state)=>state?.employee?.currentUser?.success)
  return user? <Outlet/> : <Navigate to ='/signup'/>
}

export default PrivateRoute
