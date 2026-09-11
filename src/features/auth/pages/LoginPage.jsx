import React from 'react'
import {useForm} from 'react-hook-form'
import logo from "../../../assets/logo.png"
import {ArrowUpRight} from "lucide-react"
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../hook/useAuth'
import Loading from '../../../components/Loading'
const LoginPage = () => {
  const { register , handleSubmit , reset } = useForm()
  const { loading , handleLogin } = useAuth();
  const navigate = useNavigate();
  const handleUserLogin = async(data)=>{
    try{
        await handleLogin(data);
        toast.success("login Successfully")
        reset()
        navigate("/home",{replace:true})
    }catch(err){
        toast.error(err.message);
    }
  }
  return (
    <main className="flex min-h-full items-center justify-center bg-[#f3f3f2] px-4 py-8 sm:px-6">
      <section className="w-full max-w-125 rounded-[28px] border border-[#dfe3e8] bg-white p-6 shadow-[0_12px_35px_rgba(31,41,55,0.06)] sm:p-10">
        <div className="mb-10 flex items-center justify-between">
          <img className="h-16" src={logo} alt="HirePrep AI" />
          <span className="rounded-full border border-[#c7d3fb] bg-[#edf3ff] px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#5d73bd]">
            Welcome back
          </span>
        </div>

        <form onSubmit={handleSubmit(handleUserLogin)} className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7181b4]">Interview workspace</p>
            <h2 className="mt-2 text-3xl font-black tracking-tighter text-[#1f2a3d] sm:text-4xl">Sign in to continue</h2>
            <p className="mt-2 text-sm leading-6 text-[#737b8c]">Access your personalized interview preparation plans.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Email" className="text-sm font-bold text-[#4e596f]">Email</label>
            <input required {...register("email")} type="email" id="Email" placeholder="you@example.com" className="rounded-xl border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-3 text-sm text-[#263149] outline-none transition placeholder:text-[#a0a8b7] focus:border-[#8da4e8] focus:ring-4 focus:ring-[#edf3ff]" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-[#4e596f]">Password</label>
            <input required {...register("password")} type="password" id="password" placeholder="Enter your password" className="rounded-xl border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-3 text-sm text-[#263149] outline-none transition placeholder:text-[#a0a8b7] focus:border-[#8da4e8] focus:ring-4 focus:ring-[#edf3ff]" />
          </div>

          <button disabled={loading} type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#273451] bg-[#273451] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1e2941] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowUpRight size={18} />}
          </button>

          <p className="text-center text-sm text-[#737b8c]">Don't have an account? <NavLink to="/register" className="font-bold text-[#5269b2] hover:text-[#3f579e]">Create one</NavLink></p>
        </form>
      </section>
    </main>
  )
}

export default LoginPage