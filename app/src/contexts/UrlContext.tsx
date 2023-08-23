import { ReactNode, createContext, useState } from "react";


interface UrlContext {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>

}
export const UrlContext = createContext({} as UrlContext);

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
