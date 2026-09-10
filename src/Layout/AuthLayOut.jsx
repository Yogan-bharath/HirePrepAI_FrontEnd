import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import Footer from '../components/Footer'
import { useAuth } from '../features/auth/hook/useAuth';
import Loading from '../components/Loading';
const AuthLayOut = () => {
  
  const {user , loading} = useAuth();
  
  if(user){
    return <Navigate to="/home"></Navigate>
  }
  
  if(loading){
    return <Loading/>
}
  return (
    <div className='flex flex-col min-h-screen justify-between'>
        <Outlet className="h-full"/>
        <Footer/>
    </div>
  )
}

export default AuthLayOut