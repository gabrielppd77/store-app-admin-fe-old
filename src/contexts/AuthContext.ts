import { createContext } from "react";

export interface FormLogin {
  email: string;
  password: string;
}

const authContext = {
  isAuthenticated: false,
  isLoading: false,
  login: async () => undefined,
  logout: () => undefined,
};

interface initialAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: FormLogin) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext(authContext as initialAuthContext);

export default AuthContext;
