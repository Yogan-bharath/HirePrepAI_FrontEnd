import React from 'react'
import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import {ArrowUpRight,Sparkles} from "lucide-react"
import logo from "../../../assets/logo.png"
import { useAuth } from '../hook/useAuth'
import { toast } from 'react-toastify'

const RegisterPage = () => {
    const { register , handleSubmit , reset } = useForm()
    const { loading , handleRegister } = useAuth();
    const navigate = useNavigate();
    const handleUserRegister = async(data)=>{
        try{
            await handleRegister(data);
            toast.success("User Register Successfully");
            reset()
            navigate("/");
        }catch(err){
            toast.error(err.message);
        }
    }
  return (
    <main className="min-h-full bg-[#f3f3f2] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-295 overflow-hidden rounded-[28px] border border-[#dfe3e8] bg-white shadow-[0_12px_35px_rgba(31,41,55,0.06)] lg:grid-cols-2">
        <section className="hidden bg-[#edf3ff] p-10 lg:flex lg:flex-col">
          <img className="h-16 w-fit rounded-full" src={logo} alt="HirePrep AI" />
          <div className="my-auto max-w-125">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7181b4]">Create your account</p>
            <h1 className="mt-3 text-5xl font-black leading-[0.98] tracking-[-0.07em] text-[#1f2a3d]">Start your journey.</h1>
            <p className="mt-5 text-base leading-7 text-[#68758e]">Build personalized interview strategies and turn your skill gaps into interview-ready strengths.</p>
            <p className="mt-7 flex items-center gap-2 text-sm font-bold text-[#5d73bd]"><Sparkles size={17} /> AI processing engine active</p>
          </div>
        </section>

        <section className="flex items-center p-6 sm:p-10">
          <form onSubmit={handleSubmit(handleUserRegister)} className="flex w-full flex-col gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7181b4] lg:hidden">HirePrep AI</p>
              <h2 className="mt-2 text-3xl font-black tracking-tighter text-[#1f2a3d] sm:text-4xl">Create your account</h2>
              <p className="mt-2 text-sm leading-6 text-[#737b8c]">Set up your workspace in just a few steps.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-bold text-[#4e596f]">User name</label>
              <input required {...register("username")} type="text" id="username" placeholder="e.g. ken12345" className="rounded-xl border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-3 text-sm text-[#263149] outline-none transition placeholder:text-[#a0a8b7] focus:border-[#8da4e8] focus:ring-4 focus:ring-[#edf3ff]" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-sm font-bold text-[#4e596f]">Email</label>
              <input required {...register("email")} type="email" id="Email" placeholder="you@example.com" className="rounded-xl border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-3 text-sm text-[#263149] outline-none transition placeholder:text-[#a0a8b7] focus:border-[#8da4e8] focus:ring-4 focus:ring-[#edf3ff]" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-bold text-[#4e596f]">Password</label>
              <input required {...register("password")} type="password" id="password" placeholder="Create a password" className="rounded-xl border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-3 text-sm text-[#263149] outline-none transition placeholder:text-[#a0a8b7] focus:border-[#8da4e8] focus:ring-4 focus:ring-[#edf3ff]" />
            </div>

            <button disabled={loading} type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#273451] bg-[#273451] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1e2941] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowUpRight size={18} />}
            </button>

            <p className="text-center text-sm text-[#737b8c]">Already have an account? <NavLink to="/" className="font-bold text-[#5269b2] hover:text-[#3f579e]">Sign in</NavLink></p>
          </form>
        </section>
      </div>
    </main>
  )
}

export default RegisterPage