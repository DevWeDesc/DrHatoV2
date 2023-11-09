import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
interface PropsAuth {
  children: ReactNode;
}
type AuthContextProps = {
  setToken: Dispatch<SetStateAction<string | null>>;
  token: string | null;
}
export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: PropsAuth) {
  const [token, setToken] = useState<null | string>(null);

  console.log(token);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
