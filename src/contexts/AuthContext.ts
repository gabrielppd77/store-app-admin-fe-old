import { createContext } from "react";

export interface FormLogin {
  email: string;
  password: string;
}

const initialAuthContext = {
  isAuthenticated: false,
  isLoading: false,
  login: async (data: FormLogin) => {},
  logout: () => {},
};

const AuthContext = createContext(initialAuthContext);

export default AuthContext;
