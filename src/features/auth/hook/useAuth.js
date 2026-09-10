import { Login , Register , Logout , getMe } from "../services/auth.api"
import { AuthContext } from "../state/auth.context"
import { useContext, useEffect } from "react"

export const useAuth = ()=>{
    let {user,setUser,loading,setLoading} = useContext(AuthContext);
    
    const handleLogin = async({email,password})=>{
        setLoading(true);
        try{
            const data = await Login({email,password})
            setUser(data.user)
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    }
    
    const handleRegister = async({username,email,password})=>{
        setLoading(true);
        try{
            const data = await Register({username,email,password})
            setUser(data.user)
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    }
    
    const handleLogout = async()=>{
        setLoading(true);
        try{
            const data = await Logout()
            setUser(null)
        }catch(err){
            throw new Error(err.message);
        }finally{
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        const getMyDetails = async ()=>{
            try{
                
                const data = await getMe();
                setUser(data.user);

            }catch(err){
                console.log(err)
            }finally{
                setLoading(false);
            }
        }
        getMyDetails()
    },[])
    

    return { user , loading , handleLogin , handleLogout , handleRegister } ;
}