import { createBrowserRouter } from 'react-router'
import AuthLayOut from '../Layout/AuthLayOut'
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import Producted from '../Layout/Producted';
import Home from '../features/interview/pages/Home';
import Interview from '../features/interview/pages/Interview';

const router = createBrowserRouter([
    {
        path:"/",
        element:<AuthLayOut/>,
        children:[
            {
                path:"",
                element:<LoginPage/>
            },{
                path:"/register",
                element:<RegisterPage/>
            }
        ]
    },{
        path:"/home",
        element:<Producted/>,
        children:[
            {
                path:"",
                element:<Home/>
            }
        ]
    },{
        path:"/interview/:interViewId",
        element:<Producted/>,
        children:[
            {
                path:"",
                element:<Interview/>
            }
        ]
    }
])

export default router;