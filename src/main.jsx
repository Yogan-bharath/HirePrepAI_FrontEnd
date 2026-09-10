import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './router/MainRouter'
import { ToastContainer } from "react-toastify"
import { AuthProvider } from './features/auth/state/auth.context'
import {InterviewProvider} from './features/interview/state/interview.context'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <InterviewProvider>
            <ToastContainer
            autoClose={1500}
            hideProgressBar
            theme="dark"
            />
            <RouterProvider router={router}/>
        </InterviewProvider>
        
    </AuthProvider>
)
