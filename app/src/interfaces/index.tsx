
export interface UserData {
    name: string;
    password: string;
    username: string;
    isAdmin: boolean;
    id?:  number | string;
  }
  export interface VetData {
    id?: number | string; 
    name:     String;
    crmv:     number;
    speciality: string;
    schedule?: []
    userType?: []
    userIsVet?: boolean;
  
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
    dataCustomer: any
    setDataCustomer: any
    dataPet: any
    setDataPet: any
    labData: any
    setLabData: any
    customer: any
    setCustomers: any
    exams: ExamsData[]
    sectors:SectorData[]
    vets: VetData[]
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

export interface ExamsProps  {
  id: number;
  requestedData: string;
  name: string;
  price: string;
  doneExam: boolean;
  coleted?: number;
}

export interface VacinnesProps{
  id: number;
  name: string;
  price: number;
  doneExam: boolean;
  requestedDate: Date | string;
}

export interface SugeriesProps {
      id: number;
			name: string;
      price: number;
		  scheduledDate?: Date
			completedDate?: Date
      }

      type QueueProps = {
        moreInfos: string;
        queueOur: string;
      };

  type customerPetsProps = {
    id: number;
    name: string;

  }    
export interface PetDetaisl {
  id: number | string;
  name: string;
  balance: number;
  customerName: string;
  customerId: string;
  especie: string;
  sexo: string;
  race: string;
  castred: boolean;
  chip: boolean;
  weigth: string;
  corPet: string;
  sizePet: string;
  bornDate: string;
  observations: string;
  recordId: number | string;
  codPet: string;
  queue: QueueProps;
  exams: ExamsProps[];
  vaccines: VacinnesProps[];
  surgeries:  SugeriesProps[];
  customerPets: customerPetsProps[]
}