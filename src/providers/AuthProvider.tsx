import { ReactNode, useEffect } from "react";

import AuthContext from "@contexts/AuthContext";

import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { nameAppStorage } from "@services/utils";
import api from "@services/api";

import moment from "moment";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    userAuthenticate,
    userLogout,
    setAuthenticated,
    userCreate,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem(nameAppStorage("access_token"));
    const expire_token = localStorage.getItem(nameAppStorage("expire_token"));

    if (access_token && moment().isBefore(expire_token)) {
      api.defaults.headers.Authorization = `Bearer ${access_token}`;
      setAuthenticated(true);
      return;
    }
    userLogout();
    setAuthenticated(false);
    navigate("/");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userAuthenticate,
        userLogout,
        userCreate,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
