import  { useState, useContext } from 'react';
import {Calendar  }from 'react-calendar';
import { DbContext } from '../../contexts/DbContext';

import './style.css'
export function Schedule() {
  const [value, onChange] = useState(new Date());
  const {day,setCurrentDay } = useContext(DbContext)

  const handleSchedule = () => {
    const currentDay = value
    const formatedDate = new Intl.DateTimeFormat('pt-BR').format(currentDay)
    setCurrentDay([...day, formatedDate])
    console.log(day)
  }
 
  const tileDisabled = ({date, view}: {date: Date, view: string}) => {
    if (view === 'month') {
      const formatedDate = new Intl.DateTimeFormat('pt-BR').format(date);
      const isDisabled = day.includes(formatedDate);
      return isDisabled;
    }
    return false;
  }

  return (
      <Calendar  tileClassName={"background:"}  tileDisabled={tileDisabled} onClickDay={() => handleSchedule()} onChange={onChange as any} value={value} />
  )
}