import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import Footer from '../components/Footer'
import { useAuth } from '../features/auth/hook/useAuth';
import Loading from '../components/Loading';

const AuthLayOut = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Outlet />
            <Footer />
        </div>
    );
};

export default AuthLayOut;