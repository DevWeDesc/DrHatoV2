import { ReactNode, createContext, useState } from "react";

export const UrlContext = createContext();

interface PropsUrl {
  children: ReactNode;
}

export const UrlContextProvider = ({ children }: PropsUrl) => {
  const [url, setUrl] = useState("");
  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      <>{children}</>
    </UrlContext.Provider>
  );
};
