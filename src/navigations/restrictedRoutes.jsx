import React, { lazy } from "react";
import ROUTES from "./routes";


const Home = lazy(() => import("../features/home"));
// product
const ProductDetails = lazy(() => import("../features/productDetails"))
const ViewAllProducts = lazy(() => import("../features/viewAllProducts"))

const Cart = lazy(() => import("../features/cart"));
// const Checkout = lazy(() => import("../features/checkout"));
// const Wishlist = lazy(() => import("../features/wishlist"));
// const Profile = lazy(() => import("../features/profile"));


export const restrictedRoutes = [
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.PRODUCT_DETAILS, element: <ProductDetails /> },
    { path: ROUTES.VIEW_ALL_PRODUCTS, element: <ViewAllProducts /> },
    
    { path: ROUTES.CART, element: <Cart /> },
    // { path: ROUTES.CHECKOUT, element: <Checkout /> },
    // { path: ROUTES.WISHLIST, element: <Wishlist /> },
    // { path: ROUTES.PROFILE, element: <Profile /> },
];
 