import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    // Create axios instance only once
    const axiosSecure = useMemo(() => {
        return axios.create({
            
            // baseURL: 'http://localhost:3000',
            baseURL: import.meta.env.VITE_api_url || 'https://zap-shift-server-phi.vercel.app',
            withCredentials: true
        });
    }, []);

    useEffect(() => {

        // REQUEST INTERCEPTOR
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // RESPONSE INTERCEPTOR
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log("AXIOS ERROR:", error);

                const statusCode = error?.response?.status;

                // Check login loop
                if ((statusCode === 401 || statusCode === 403) &&
                    window.location.pathname !== '/login') 
                {
                    await logOut();
                    navigate('/login');
                }

                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };

    }, [user, logOut, navigate, axiosSecure]);

    return axiosSecure;
};

export default useAxiosSecure;
