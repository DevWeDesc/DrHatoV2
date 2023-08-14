import React, { createContext, ReactNode, useState } from "react";
import ProtectedRouteMiddleware from "../middleware/ProtectAuthMiddleware";

export const AuthContext = createContext();

interface PropsAuth {
  children: ReactNode;
}

export function AuthContextProvider({ children }: PropsAuth) {
  const [token, setToken] = useState<null | string>(null);

  console.log(token);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
