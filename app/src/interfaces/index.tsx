import { SetStateAction } from "react";

export interface UserData {
  name: string;
  password: string;
  username: string;
  isAdmin: boolean;
  id?: number | string;
}
export interface VetData {
  id?: number | string;
  email: string;
  username: String;
  crmv: number;
  speciality: string;
  schedule?: [];
  userType?: [];
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
  userType: string;
  id?: number | string;
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
  name: string;
  examsType: string;
  price: number;
  available: boolean;
  applicableGender?: string;
  subName?: string;
  description?: string;
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
  sector: SectorData;
}
type LoggedInUserProps = {
  email: string;
  username: string;
};

export interface IDBContext {
  userDataList: UserData[];
  pagination: number;
  setPagination: React.Dispatch<React.SetStateAction<number>>;
  day: string[];
  setCurrentDay: React.Dispatch<React.SetStateAction<string[]>>;
  autorization: AutorizationData[];
  setAutorization: React.Dispatch<React.SetStateAction<AutorizationData[]>>;
  dbLoaded: boolean;
  generateAut: AutPDFProps;
  setGenerateAut: React.Dispatch<React.SetStateAction<AutPDFProps>>;
  dataCustomer: any;
  setDataCustomer: any;
  dataPet: any;
  setDataPet: any;
  labData: any;
  setLabData: any;
  customer: any;
  setCustomers: any;
  exams: ExamsData[];
  sectors: SectorData[];
  vets: VetData[];
  instructions: InstructionsData[];
  setExams: React.Dispatch<React.SetStateAction<ExamsData[]>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  groups: GroupsData[];
  procedures: ProceduresData[];
}

export interface CreateUserFormData {
  name: string;
  password: string;
  username: string;
  isAdmin: boolean;
}

export interface ExamsProps {
  id: number;
  requestedData: string;
  name: string;
  price: string;
  doneExam: boolean;
  coleted?: number;
}

export interface VacinnesProps {
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
        id: string | number;
        moreInfos: string;
        queueOur: string;
        vetPreference: string;
        queueEntry: Date;
        queryType: string;
        petIsInQueue: boolean;
      };

      type totalAccProps = {
        id: number;
        price: number;
         } 
         
  type customerPetsProps = {
    id: number;
    name: string;
  }    
  type ProceduresProps = {
    id: number;
    name: string;
    price: number;
    available: boolean;
    requestedDate: Date 
  }

  type KennelProps = {
    name: string;
    price: number;
  }
  type BedInfosProps = {
    id: number;
    entry: Date | number;
    kennelName: KennelProps;
    fasting: boolean;
  }

  type AdmissionsProps = {
    id: number;
    entry:Date;
   exit: Date;
    totalDebit: number | string;
   fasting: boolean;
   observations: string;
  }

 export type HistoryBoxProps = {
    id: string | number
  	entryValues: number
		exitValues: number
    totalValues: number
    openBox: Date | number
    closeBox: Date | number
    openBy: string
    closedBy: string
    boxIsOpen: boolean;
    hospVetBoxId: string | number
}

export interface BoxProps {
    id: string | number
		name: string
		movimentedValues: number
		entryValues: number
		exitValues: number
		boxIsOpen: boolean
		historyBox: HistoryBoxProps[]
}
  
export interface PetDetaisl {
  id: number | string;
  more: string;
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
  procedures: ProceduresProps[];
  customerPets: customerPetsProps[];
  bedInfos: BedInfosProps;
  isBusy: boolean;
  totalAcc: totalAccProps;
  admissions: AdmissionsProps[];
}
