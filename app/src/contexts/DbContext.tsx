import { createContext, useState, useEffect } from 'react'
import { IDBContext, UserData, VetData } from '../interfaces';
import { api } from '../lib/axios';


export const DbContext = createContext({} as IDBContext )
export function DbContextProvider ({children}: any) {
  const [userDataList, setUserListData] = useState<UserData[]>([])
  const [pagination, setPagination] = useState(1)
  const [vetList, setVetList] = useState<VetData[]>([])
  const [day, setCurrentDay]  = useState([] as string[])


  // USUARIOS
  useEffect(() => {
    async function UsersList() {
      const response = await api.get(`userall?pag=${pagination}`)
    
      setUserListData(response.data.users)
      console.log('users',response)
      }
      UsersList()
  }, [])
  // VETS
  useEffect( () => {
    async function VetList () {
      const response = await api.get('/vets')

      setVetList(response.data)
    }
    VetList()
  },[])


  return (
      <DbContext.Provider value={{ userDataList, pagination, setPagination, vetList, day, setCurrentDay}}>
          {children}
      </DbContext.Provider>
  )
}