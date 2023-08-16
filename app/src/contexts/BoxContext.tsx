import { createContext, useState, useEffect } from 'react'
import { BoxProps, HistoryBoxProps } from '../interfaces';
import { api } from '../lib/axios';

interface IBoxContextProps {
    dailyBox: HistoryBoxProps
    fatherBox: BoxProps
    reloadData: boolean
    setDailyBox: React.Dispatch<React.SetStateAction<HistoryBoxProps>>
    setFatherBox: React.Dispatch<React.SetStateAction<BoxProps>>
    setReloadData: React.Dispatch<React.SetStateAction<boolean>>
    boxIsOpen: boolean 
}

type BoxContextProps = {
    children: React.ReactNode
  }
  export const BoxContext = createContext({} as IBoxContextProps )
  export function BoxContextProvider ({children}: BoxContextProps) {
    const [dailyBox, setDailyBox] = useState({} as HistoryBoxProps);
    const [fatherBox, setFatherBox] = useState({} as BoxProps);
    const [reloadData, setReloadData] = useState(false);
    const [boxIsOpen, setBoxIsOpen] = useState(false)
    const getDailyBox = async () => {
        const response = await api.get("/dailybox")
        return response.data
    } 
    const getFatherBox = async () => {
        const response = await api.get("/vetbox")
        return response.data
    } 

    useEffect(()=> {
     Promise.all([getDailyBox(), getFatherBox()]).then(([box, fatherBox]) => {
        setDailyBox(box)
        setFatherBox(fatherBox)
     })
    },[])


     useEffect(() => {
            if(reloadData === true) {
                getDailyBox()
                getFatherBox()
                setBoxIsOpen(true)
            }
     }, [reloadData]);

     
     
    return (
        <BoxContext.Provider value={{dailyBox, fatherBox, reloadData, setDailyBox, setFatherBox, setReloadData, boxIsOpen}}>
            {children}
        </BoxContext.Provider>

    )
  }