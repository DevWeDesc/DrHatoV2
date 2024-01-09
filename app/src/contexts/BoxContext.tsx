import { createContext, useState, useEffect } from 'react'
import { BoxProps, HistoryBoxProps } from '../interfaces';
import { api } from '../lib/axios';

export interface IBoxContextProps {
    dailyBox: HistoryBoxProps
    lastBox: HistoryBoxProps
    fatherBox: BoxProps
    reloadData: boolean
    setDailyBox: React.Dispatch<React.SetStateAction<HistoryBoxProps>>
    setFatherBox: React.Dispatch<React.SetStateAction<BoxProps>>
    setReloadData: React.Dispatch<React.SetStateAction<boolean>>
}

type BoxContextProps = {
    children: React.ReactNode
  }
  export const BoxContext = createContext({} as IBoxContextProps )
  export function BoxContextProvider ({children}: BoxContextProps) {
    const [dailyBox, setDailyBox] = useState({} as HistoryBoxProps);
    const [lastBox, setLastBox] = useState({} as HistoryBoxProps);
    const [fatherBox, setFatherBox] = useState({} as BoxProps);
    const [reloadData, setReloadData] = useState(false);
    const getDailyBox = async () => {
        const response = await api.get("/dailybox")
        return response.data
    } 

    const getLastBox = async () => {
        const response = await api.get("/lastbox")
        return response.data
    } 
    const getFatherBox = async () => {
        const response = await api.get("/vetbox")
        return response.data
    } 


    useEffect(()=> {
     Promise.all([getDailyBox(), getFatherBox(), getLastBox()]).then(([box, fatherBox, lastBox]) => {
        setDailyBox(box)
        setFatherBox(fatherBox)
        setLastBox(lastBox)
     })
    },[])


     useEffect(() => {
            if(reloadData === true) {
             Promise.all([getDailyBox(), getFatherBox(), getLastBox()]).then(([box, fatherBox, lastBox]) => {
                    setDailyBox(box)
                    setFatherBox(fatherBox)
                    setLastBox(lastBox)
                 })
                setReloadData(false);
            }
     }, [reloadData]);

     
     
    return (
        <BoxContext.Provider value={{dailyBox, fatherBox, reloadData, setDailyBox, setFatherBox, setReloadData, lastBox}}>
            {children}
        </BoxContext.Provider>

    )
  }