import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import moment from "moment";

import useAlert from "@hooks/useAlert";
import useNotification from "@hooks/useNotification";

import api from "@services/api";
import { nameAppStorage } from "@services/utils";
import { FixMeLater } from "@services/FixeMeLater";

import AuthContext from "@contexts/AuthContext";

export interface FormUserLogin {
  email: string;
  password: string;
}

export interface FormUserCreate {
  email: string;
  name: string;
  password: string;
}

export default function useAuth() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const alert = useAlert();
  const notification = useNotification();
  const navigate = useNavigate();

  function userLogout() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(nameAppStorage())) {
        localStorage.removeItem(key);
      }
    }
  }

  async function userAuthenticate(data: FormUserLogin) {
    setLoading(true);
    try {
      const response = await api.post("/user/authenticate", data);
      const { access_token, expire_token } = response.data;

      const tokenExpire = moment().add(expire_token).format();

      localStorage.setItem(nameAppStorage("access_token"), access_token);
      localStorage.setItem(nameAppStorage("expire_token"), tokenExpire);
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      setAuthenticated(true);

      notification.success("Seja bem vindo!");
      navigate("/dashboard");
    } catch (error) {
      alert.extractError(error as FixMeLater);
    } finally {
      setLoading(false);
    }
  }

  async function userCreate(data: FormUserCreate) {
    setLoading(true);
    try {
      await api.post("/user/create", data);
      delete data.name;
      await userAuthenticate(data);
    } catch (error) {
      alert.extractError(error as FixMeLater);
    } finally {
      setLoading(false);
    }
  }

  return {
    isAuthenticated,
    isLoading,
    userLogout,
    userAuthenticate,
    userCreate,
    setAuthenticated,
  };
}

export function useAuthContext() {
  return useContext(AuthContext);
}
