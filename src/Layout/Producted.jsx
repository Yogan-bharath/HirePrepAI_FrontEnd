
import { useAuth } from '../features/auth/hook/useAuth'
import { Navigate, Outlet } from 'react-router';
import Footer from '../components/Footer';

const Producted = () => {
const {loading , user} = useAuth();

if(loading){
    return null
}

if(!user){
    return <Navigate to={"/"}></Navigate>;
}

  return (
    <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Producted