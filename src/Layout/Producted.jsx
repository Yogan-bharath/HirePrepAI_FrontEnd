
import { useAuth } from '../features/auth/hook/useAuth'
import { Navigate, Outlet } from 'react-router';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Producted = () => {
const {loading , user} = useAuth();

if(loading){
    return <Loading/>
}

if(!user){
    return <Navigate to={"/"}  replace/>;
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