import React, { lazy } from "react";
import ROUTES from "./routes";


const Login = lazy(() => import("../features/auth/login"));
const Signup = lazy(() => import("../features/auth/signup"));
const ForgetPassword = lazy(() => import("../features/auth/forgetPassword"));

export const authRoutes = [
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.SIGNUP, element: <Signup /> },
    { path: ROUTES.PASSWORD_RESET, element: <ForgetPassword /> },
];