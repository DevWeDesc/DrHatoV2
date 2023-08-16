import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";

interface MiddlewareProps {
  children: any;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const ProtectedRouteMiddleware = ({ children }: MiddlewareProps) => {
  const { setToken } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const path = useLocation();
  const userToken = Cookies.get("token");
  //setToken(userToken);

  {
    /*
  if(path.pathname != "http://localhost:5173") {
    if (!userToken || userToken === undefined || userToken === null) {
      navigate('http://localhost:5173');
      toast.error("SEM ACESSO NÃO AUTORIZADO")
      return null;
    }
  }

    */
  }

  return children;
};

export default ProtectedRouteMiddleware;
