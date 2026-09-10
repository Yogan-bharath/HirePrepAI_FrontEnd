import axios from "axios"
import { TurkishLira } from "lucide-react";

const authAPI = axios.create({
    baseURL:"https://hire-prep-ai-back-end.vercel.app",
    withCredentials:true
})

export async function Register({username , email , password}) {
        let res;
        try{
            res = await authAPI.post("/api/auth/register",{
                username,email,password
            })
            return res.data;
        }
        catch(error){
            throw new Error(error.response?.data?.message || "Register Failed")
        }
}

export async function Login({email , password}){
    let res
    try{
        res = await authAPI.post("/api/auth/login",{
            email,password
        })
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Login Failed")
    }
}

export async function Logout(){
    let res;
    try{
        
        res = await authAPI.get("/api/auth/logout")
        return res.data;

    }catch(error){
        throw new Error(error.response?.data?.message || "Logout Failed")

    }
}

export async function getMe(){
    let res;
    try{
        res = await authAPI.get("/api/auth/get-me")
        return res.data;

    }catch(error){
        throw new Error(error.response?.data?.message || "Failed fetch details")

    }
}





