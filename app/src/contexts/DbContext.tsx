import { createContext, useState, useEffect } from 'react'
import { IDBContext, AutorizationData, UserData, AutPDFProps } from '../interfaces';
import { api } from '../lib/axios';


type DbContextProps = {
  children: React.ReactNode
}

export const DbContext = createContext({} as IDBContext )
export function DbContextProvider ({children}: DbContextProps) {
  const [userDataList, setUserListData] = useState<UserData[]>([])
  const [pagination, setPagination] = useState(1)
  const [day, setCurrentDay]  = useState([] as string[])
  const [autorization, setAutorization] = useState<AutorizationData[]>([])
  const [dbLoaded, setDbLoaded] = useState(false)
  const [generateAut, setGenerateAut] = useState<AutPDFProps>({})
  const [data, setData] = useState({})

  useEffect(() => {
    async function GetAllDataInDB() {
      const getAutorizations = async () => {
        const response = await api.get('autorizations');
        return response.data;
      };
    
      const getUserListData = async () => {
        const response = await api.get(`users?pag=${pagination}`);
        return response.data.users
      };
  
    
      Promise.all([getAutorizations(), getUserListData(), ])
        .then(([autorizations, userListData,]) => {
          setAutorization(autorizations)
          setUserListData(userListData)
    
          setTimeout(()=>{
            setDbLoaded(true)
          },2000)
        
        })
        .catch(error => {
          console.log('Ocorreu um erro:', error);
        });
    }
    GetAllDataInDB()

  },[])

 

  return (
      <DbContext.Provider value={{dbLoaded, userDataList, pagination, setPagination, day, setCurrentDay, autorization, setAutorization, generateAut, setGenerateAut, data, setData }}>
          {children}
      </DbContext.Provider>
  )
}