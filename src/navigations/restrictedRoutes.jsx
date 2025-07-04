import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../auth/Home"));

export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
];
 