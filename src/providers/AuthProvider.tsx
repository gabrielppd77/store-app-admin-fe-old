import { useEffect, useState, ReactNode } from "react";

import { useNavigate } from "react-router-dom";

import moment from "moment";

import useAlert from "@hooks/useAlert";
import useNotification from "@hooks/useNotification";

import api from "@services/api";
import { nameAppStorage } from "@services/utils";
import { FixMeLater } from "@services/FixeMeLater";

import AuthContext, { FormLogin } from "@contexts/AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const alert = useAlert();
  const notification = useNotification();
  const navigate = useNavigate();

  function logout() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key?.startsWith(nameAppStorage())) {
        localStorage.removeItem(key);
      }
    }
  }

  useEffect(() => {
    const access_token = localStorage.getItem(nameAppStorage("access_token"));
    const expire_token = localStorage.getItem(nameAppStorage("expire_token"));

    if (access_token && moment().isBefore(expire_token)) {
      api.defaults.headers.Authorization = `Bearer ${access_token}`;
      setAuthenticated(true);
      return;
    }
    logout();
    setAuthenticated(false);
    navigate("/");
  }, []);

  async function login(data: FormLogin) {
    setLoading(true);
    try {
      const response = await api.post("/login", data);
      const { access_token, expire_token } = response.data;

      const tokenExpire = moment().add(expire_token).format();

      localStorage.setItem(nameAppStorage("access_token"), access_token);
      localStorage.setItem(nameAppStorage("expire_token"), tokenExpire);
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      setAuthenticated(true);

      notification.success("Seja bem vindo!");
      navigate("/dashboard");
    } catch (error: FixMeLater) {
      alert.extractError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
