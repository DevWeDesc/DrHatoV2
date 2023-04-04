
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
  
  export interface IDBContext {
    userDataList: UserData[]
    pagination: number
    setPagination: React.Dispatch<React.SetStateAction<number>>
    vetList: VetData[]
    day: string[]
    setCurrentDay: React.Dispatch<React.SetStateAction<string[]>>
  }

 export interface UserData {
    name: string;
    password: string;
    username: string;
    isAdmin: boolean;
    id?:  number | string;
}

export interface IAuthContext {
    validateLogin: () => boolean;
    userLogin?: string;
    setUserLogin:  React.Dispatch<React.SetStateAction<string>>
    userPassword?: string;
    setUserPassword: React.Dispatch<React.SetStateAction<string>>
    userData: UserData[]
}