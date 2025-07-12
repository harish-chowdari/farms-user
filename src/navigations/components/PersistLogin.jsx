import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';

import authRoutes from '../routes/authRoutes';
import { AUTH_STATUS } from '../../config/constants';
import ROUTES from '../routes/routes';
import { screenLoading } from '../../assets/gifs';

const PersistLogin = () => {

    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const { authData, setAuthData } = useAuth();

    useEffect(() => {
        const verifyrefreshtoken = async () => {

            //@ts-ignore
            setAuthData(prev => {
                return {
                    ...prev,
                    status: AUTH_STATUS.LOADING
                }
            });

            try {
                await refresh();
            } catch (error) {
                // if(!authRoutes.flatMap(obj => obj.path).includes(window.location.pathname)) 
                
                navigate(ROUTES.LOGIN);
            }
        }

        !authData.accessToken && verifyrefreshtoken();
    }, []);

    if(authData.status === AUTH_STATUS.DEFAULT || authData.status === AUTH_STATUS.LOADING) 
        return <div className='w-full h-[100vh] flex justify-center items-center bg-[#F2F2F2]'>
            <div className='w-[20%]'>
                <Lottie 
                    animationData={screenLoading}
                    loop
                />
            </div>
        </div>
    else return <Outlet />
}

export default PersistLogin;
