
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

  export interface SectorData {
    id: number | string;
    name: string;
  }
  export interface InstructionsData {
    id: number | string;
    name: string;
    description: string;
  }
  export interface UserData {
    name: string;
    password: string;
    username: string;
    userType: string
    id?:  number | string;
}

export interface AutorizationData {
  id: number | string;
  name: string;
  text: string;
}

export interface GroupsData {
  id: string | number;
  name: string;
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

export interface ExamsData {
  id: number | string;
  name: string,
  examsType: string,
  price: number,
  available: boolean,
  applicableGender?: string,
  subName?: string,
  description?: string,
}

  export interface ProceduresData {
    id: string | number;
    name: string;
    price: number;
    available: boolean;
    observations: string;
    applicationGender: string;
    ageRange: string;
    groups: GroupsData;
    sector: SectorData
  }
  
  export interface IDBContext {
    userDataList: UserData[]
    pagination: number
    setPagination: React.Dispatch<React.SetStateAction<number>>
    day: string[]
    setCurrentDay: React.Dispatch<React.SetStateAction<string[]>>
    autorization: AutorizationData[]
    setAutorization: React.Dispatch<React.SetStateAction<AutorizationData[]>>
    dbLoaded: boolean
    generateAut: AutPDFProps
    setGenerateAut: React.Dispatch<React.SetStateAction<AutPDFProps>>
    data: any
    setData: any
    labData: any, 
    setLabData: any
    customer: any,
    setCustomers: any,
    exams: ExamsData[]
    sectors:SectorData[]
    instructions: InstructionsData[]
    setExams: React.Dispatch<React.SetStateAction<ExamsData[]>>
    refresh: boolean
    setRefresh:  React.Dispatch<React.SetStateAction<boolean>>
    groups: GroupsData[]
    procedures: ProceduresData[]
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

