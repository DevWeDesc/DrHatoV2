
export interface UserData {
    name: string;
    password: string;
    username: string;
    isAdmin: boolean;
    id?:  number | string;
  }
  export interface VetData {
    id?: number | string; 
    name:     String
    speciality: String
    crmv:      number
    schedule: []
  
  }

  export interface UserData {
    name: string;
    password: string;
    username: string;
    isAdmin: boolean;
    id?:  number | string;
}

export interface AutorizationData {
  id: number | string;
  name: string;
  text: string;
}

export interface AutPDFProps {
  name?: string;
  adress?: string;
  cpf?: string;
  petName?: string;
  petDescription?: string;
  autName?: string;
  autText?: string;  
}
  
  export interface IDBContext {
    userDataList: UserData[]
    pagination: number
    setPagination: React.Dispatch<React.SetStateAction<number>>
    vetList: VetData[]
    day: string[]
    setCurrentDay: React.Dispatch<React.SetStateAction<string[]>>
    autorization: AutorizationData[]
    setAutorization: React.Dispatch<React.SetStateAction<AutorizationData[]>>
    dbLoaded: boolean
    generateAut: AutPDFProps
    setGenerateAut: React.Dispatch<React.SetStateAction<AutPDFProps>>
    data: any
    setData: any
  }


export interface IAuthContext {
    validateLogin: () => boolean;
    userLogin?: string;
    setUserLogin:  React.Dispatch<React.SetStateAction<string>>
    userPassword?: string;
    setUserPassword: React.Dispatch<React.SetStateAction<string>>
    userData: UserData[]
}


export interface CreateUserFormData {
  name: string;
  password: string;
  username: string;
  isAdmin: boolean;
}

