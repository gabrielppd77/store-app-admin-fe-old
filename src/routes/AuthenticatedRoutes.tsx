import { lazy } from "react";

import MainLayout from "../layouts/MainLayout";

const Dashboard = lazy(() => import("@pages/Dashboard"));

const AuthenticatedRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};

export default AuthenticatedRoutes;
