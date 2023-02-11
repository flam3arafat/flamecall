import React from "react";
const Landing = React.lazy(() => import("../components/Landing/landing"));
const Login = React.lazy(() => import("../components/Login/login"));
const Signup = React.lazy(() => import("../components/Signup/signup"));
const Preloader = React.lazy(() => import("../components/Preloader/preloader"));

var mainRoutes = [
  { path: "/", name: "Landing Page", component: <Landing /> },
  { path: "/preloader", name: "Landing Page", component: <Preloader /> },
  { path: "/login", name: "Landing Page", component: <Login /> },
  { path: "/signup", name: "Landing Page", component: <Signup /> },
];

export default mainRoutes;
