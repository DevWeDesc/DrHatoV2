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
  codexam: number;
  requestedData: string;
  name: string;
  price: string;
  doneExam: boolean;
  byText: boolean;
  onePart: boolean;
  twoPart: boolean;
  coleted?: number;
  linkedConsultId: number | null;
  linkedAdmissionId: number | null;
}

export interface VacinnesProps {
  // linkedDebitId(id: number, price: number, linkedDebitId: number): void;
  id: number;
  name: string;
  price: number;
  doneExam: boolean;
  requestedDate: Date | string;
  linkedDebitId: number;
  linkedConsultId: number;
}

enum SurgerieStatus {
  FINISHED,
  STARTED,
  INPROGRESS,
}

export interface SugeriesProps {
  slotId: number;
  id: number;
  name: string;
  price: number;
  scheduledDate?: Date;
  completedDate?: Date;
  surgerieStatus: string;
  linkedConsultId: number;
}

type QueuePetOn = {
  name: string;
  id: number;
};
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
};

type customerPetsProps = {
  id: number;
  name: string;
};
type ProceduresProps = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  requestedDate: Date;
  linkedConsultId: number | null;
  linkedAdmissionId: number | null;
};

type KennelProps = {
  name: string;
  price: number;
};
type BedInfosProps = {
  id: number;
  entry: Date | number;
  kennelName: KennelProps;
  fasting: boolean;
  vetPreference?: string;
};

type AdmissionsProps = {
  id: number;
  entry: Date;
  exit: Date;
  totalDebit: number | string;
  fasting: boolean;
  observations: Array<{
    id: number;
    observations: string;
    observationDate: Date | string;
  }>;
};
type PetQueueProps = {
  [x: string]: any;
  id: number;
  queueEntry: Date;
  queueExit: Date;
  queryType: String;
  debitOnThisQuery: number;
  responsibleVeterinarian: string;
  pet: QueuePetOn;
};
type PetBedsProps = {
  id: number;
  openedAdmissionId: string;
  entryOur: Date;
  exitOur: Date;
  mustFasting: boolean;
  totalDebt: number;
  isCompleted: boolean;
  admissionsObservations: string;
  medicine_id: number;
  medicine: {
    id: number;
    observations: string[];
    pet: { id: number; name: string };
  };
};
type MedicineRecordsProps = {
  petQueues: PetQueueProps[];
  petBeds: PetBedsProps[];
};

export type HistoryBoxProps = {
  id: string | number;
  entryValues: number;
  exitValues: number;
  totalValues: number;
  openBox: Date | number;
  closeBox: Date | number;
  openBy: string;
  boxIsOpen: boolean;
  closedBy: string;
  hospVetBoxId: string | number;
};

export interface BoxProps {
  id: string | number;
  name: string;
  movimentedValues: number;
  entryValues: number;
  exitValues: number;
  boxIsOpen: boolean;
  historyBox: HistoryBoxProps[];
}

export interface healthInsuranceName {
  id: number;
  healthInsuranceName: string;
}

export interface PetDetaisl {
  CodAnimal: string | number;
  id: number;
  more: string;
  name: string;
  balance: number;
  customerName: string;
  customerId: string;
  customer_id: string;
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
  surgeries: SugeriesProps[];
  procedures: ProceduresProps[];
  customerPets: customerPetsProps[];
  consultsPet: ConsultsPetDetails[];
  medicineRecords: MedicineRecordsProps;
  bedInfos: BedInfosProps;
  isBusy: boolean;
  totalAcc: totalAccProps;
  admissions: AdmissionsProps[];
  admissionsHealthPlan?: healthInsuranceName[];
  vetPreference: string;
  customer: { name: string };
  queueHistory: QueueHistoryProps[];
}

export type ConsultsPetDetails = {
  healthInsuranceName: string;
  healthInsuranceId: number;
  id: string;
  openedDate: string;
  openedBy: string;
  vetPreference: string;
  consultType: string;
  medicineRecordId: number;
  clientIsVip: boolean;
  observations?: string;
};

type QueueHistoryProps = {
  id: number;
  queueEntry: Date;
  queueExit: Date;
  queryType: Date;
  debitOnThisQuery: number;
  responsibleVeterinarian: string;
  petName: string;
  petWeight: string;
  observations: string;
  medicine_id: number;
};
type AccountProps = {
  consultId: string;
  id: number;
  accountNumber: number;
  debits: number;
  credits: number;
  installments: InstallmentsProps[];
};

type InstallmentsProps = {
  id: number;
  debitName: string;
  totalDebit: number;
  paymentType: string;
  paymentDate: Date | number;
  installmentAmount: number;
  amountInstallments: number;
  boxHistoryId: number;
};
export interface ICustomer {
  id: number;
  name: string;
  adress: string;
  district: string;
  cep: string | null;
  neighbour: string;
  state: string;
  phone: string;
  tell: string;
  cpf: string;
  rg: string;
  email: string;
  birthday: string;
  balance: number;
  kindPerson: string;
  vetPreference: string | null;
  howKnowUs: string;
  customerAccount: AccountProps;
  pets: PetDetaisl[];
}
export interface OldConsults {
  id: number;
  CodCli: number;
  CodAnimal: number;
  name: string;
  especie: string;
  sexo: string;
  race: string;
  weigth: string;
  haveChip: boolean;
  corPet: string;
  sizePet: string;
  bornDate: string;
  dateAge: null;
  observations: string;
  customer_id: number;
  codPet: string;
  isCastred: boolean;
  debits: string;
  petOldConsults: PetOldConsult[];
}
export interface PetOldConsult {
  id: number;
  codConsulta: number;
  date: Date;
  vetId: number;
  vetName: string;
  petWeight: number;
  petName: string;
  customerName: string;
  consulType: string;
  CodAnimal: number;
  CodCli: number;
  petsId: number;
}

export interface IDocBox {
  Installments: Installments[];
  customers: ICustomer[];
}

export interface Installments {
  id: number;
  debitName: null | string;
  totalDebit: number;
  paymentType: string;
  paymentDate: string;
  installmentAmount: number;
  amountInstallments: string;
  customerId: number;
  boxHistoryId: number;
  customerAccount: {
    id: number;
    accountNumber: number;
    debits: string;
    credits: string;
    customerId: number;
    clientIsVip: null | boolean;
    customer: ICustomer;
  };
}

interface IProcedure {
  id: number;
  name: string;
  value: string;
  quantity: number;
}

interface IConsults {
  id: number;
  procedures: IProcedure[];
  consultsQuantity: number;
  consultsInvoicing: number;
}

interface IAdmissions {
  id: number;
  procedures: IProcedure[];
  consultsQuantity: number;
  consultsInvoicing: number;
}

interface IReport {
  id: number;
  consults: IConsults;
  admissions: IAdmissions;
}

interface IReportItem {
  id: number;
  name: string;
  report: IReport;
}

export interface IReportResponse {
  reports: IReportItem[];
}

export interface IReportExams {
  id: number;
  date: string;
  customerName: string;
  customerEmail: string;
  customerTell?: string;
  customerPhone: string;
  examName: string;
  examPrice: number;
  petName: string;
  petEsp: string;
  responsibleVet: string;
  sector: string;
}
