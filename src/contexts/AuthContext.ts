import { createContext, Dispatch, SetStateAction } from "react";

import { FormUserCreate, FormUserLogin } from "@hooks/useAuth";

const authContext = {
  isAuthenticated: false,
  isLoading: false,
  userAuthenticate: async () => {
    return;
  },
  userLogout: () => {
    return;
  },
  userCreate: async () => {
    return;
  },
  setAuthenticated: () => {
    return;
  },
};

interface initialAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  userAuthenticate: (data: FormUserLogin) => Promise<void>;
  userLogout: () => void;
  userCreate: (data: FormUserCreate) => Promise<void>;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext(authContext as initialAuthContext);

export default AuthContext;
