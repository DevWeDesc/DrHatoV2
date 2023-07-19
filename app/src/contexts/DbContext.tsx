import { createContext, useState, useEffect } from 'react'
import { IDBContext, AutorizationData, UserData, AutPDFProps, ExamsData, SectorData, InstructionsData, GroupsData, ProceduresData, VetData } from '../interfaces';
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
  const [dataCustomer, setDataCustomer] = useState({})
  const [dataPet, setDataPet] = useState([])
  const [customer, setCustomers] = useState([])
  const [labData, setLabData] = useState([])
  const [exams, setExams] = useState<ExamsData[]>([])
  const [sectors, setSectors] = useState<SectorData[]>([])
  const [groups, setGroups] = useState<GroupsData[]>([])
  const [procedures, setProcedures] = useState<ProceduresData[]>([])
  const [instructions, setIntructions] = useState<InstructionsData[]>([])
  const [vets, SetVetsList] = useState<VetData[]>([])
  const [refresh, setRefresh] = useState(false);


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
      
      const getExamesListData = async () => {
        const response = await api.get('exams')
        return response.data
      }
      const getSectorsListData =  async () => {
        const response = await api.get('sectors')
        return response.data
      } 

      const getInstructionsListData =  async () => {
        const response = await api.get('instructions')
        return response.data
      } 

      const getGroupsListData =  async () => {
        const response = await api.get('groups')
        return response.data
      }

      const getProceduresListData =  async () => {
        const response = await api.get('procedures')
        return response.data
      }

      const getVetsListData =  async () => {
        const response = await api.get('vets')
        return response.data
      }

    
      Promise.all([getAutorizations(), getUserListData(), getExamesListData(), getSectorsListData(), getInstructionsListData(), getGroupsListData(), getProceduresListData(), getVetsListData()])
        .then(([autorizations, userListData, exams, sectors, instructions, groups, procedures, vets]) => {
          setAutorization(autorizations)
          setUserListData(userListData)
          setExams(exams)
          setSectors(sectors)
          setIntructions(instructions)
          setGroups(groups)
          setProcedures(procedures)
          SetVetsList(vets)
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
      <DbContext.Provider value={{
        dbLoaded, 
        userDataList, 
        pagination, 
        setPagination, 
        day, setCurrentDay, 
        autorization, 
        setAutorization, 
        generateAut, 
        setGenerateAut, 
        dataCustomer, 
        setDataCustomer,
        dataPet,
        setDataPet,
        exams, 
        setExams,
        refresh,
        setRefresh,
        sectors,
        instructions,
        groups,
        procedures,
        labData,
        setLabData,
        customer,
        setCustomers,
        vets
      }}>
          {children}
      </DbContext.Provider>
  )
}