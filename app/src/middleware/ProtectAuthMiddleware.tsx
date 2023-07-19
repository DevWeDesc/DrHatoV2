import Cookies from 'js-cookie';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

interface MiddlewareProps {
  children: any
}


const ProtectedRouteMiddleware = ({ children }: MiddlewareProps) => {
  const navigate = useNavigate();
  const path = useLocation()
  const userToken = Cookies.get('token')


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
