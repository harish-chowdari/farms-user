import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
];
 