import React from "react";

export const protectedRoutes = [
    {
        key: "home",
        path:"/home",
        component: React.lazy(() => import('../../views/HomeView'))
    }
]

export const publicRoutes = [
    {
        key:"signup",
        path:"/signup",
        component: React.lazy(() => import('../../views/SignupView'))
    },
    {
        key:"",
        path:"/",
        component: React.lazy(() => import('../../views/LoginView'))
    },
]