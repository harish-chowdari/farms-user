import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
// product

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },

];
 