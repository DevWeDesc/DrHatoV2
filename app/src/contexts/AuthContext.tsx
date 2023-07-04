import { createContext, useState, useEffect } from 'react'
import { IAuthContext, UserData } from '../interfaces';
import { api } from '../lib/axios';

export const AuthContext = createContext({} as IAuthContext)
export function AuthContextProvider ({children}: any) {
    const [userLogin, setUserLogin] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userData, setUserData] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        
        async function GetUser() {
          try {
            const response = await api.get('/users');
            setUserData(response.data.users);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      
        GetUser();
      }, []);
     
    const validateLogin = () =>  {
        const  userExists =  userData.find( (user) => user.name === userLogin && user.password === userPassword )
        localStorage.setItem('userSession', JSON.stringify(userExists))
        if(userExists) {
            return true
        } else {
            return false
        }
    }

    return (
        <AuthContext.Provider value={{userPassword, setUserLogin, setUserPassword, validateLogin, userData, userLogin}}>
            {children}
        </AuthContext.Provider>
    )
}