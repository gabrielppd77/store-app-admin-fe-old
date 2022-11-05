import { lazy } from "react";

import UnthenticatedLayout from "../layouts/UnthenticatedLayout";

const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));

const UnthenticatedRoutes = {
  path: "/",
  element: <UnthenticatedLayout />,
  children: [
    {
      path: "",
      element: <></>,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default UnthenticatedRoutes;
