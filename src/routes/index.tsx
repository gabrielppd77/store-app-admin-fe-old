import { useRoutes, BrowserRouter } from "react-router-dom";

import AuthProvider from "@providers/AuthProvider";

import UnthenticatedRoutes from "./UnthenticatedRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

function RoutesResult() {
  return useRoutes([UnthenticatedRoutes, AuthenticatedRoutes]);
}

export default function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesResult />
      </AuthProvider>
    </BrowserRouter>
  );
}
