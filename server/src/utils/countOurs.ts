const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

//@ts-ignore
function getDiferrenceBetweenOurs(entryOur, exitOur, dailyRate) {
  const fullDate = dayjs(new Date(entryOur))
  const finalDate = dayjs(new Date(exitOur))
  try {
    const differenceBetweenDates = finalDate.diff(fullDate, 'minute')
    let totalToPay = dailyRate;
    let price = 300
    if(differenceBetweenDates > 60) {
      totalToPay+= (price / 2)
      if(differenceBetweenDates >= 720) {
        let diffToPay = Math.ceil((differenceBetweenDates / 720))
        totalToPay+= diffToPay * (price / 2) - 150
      } 
    
    }

    return totalToPay;
  } catch (error) {
    console.log(error);
  }
  
}



module.exports = {
  getDiferrenceBetweenOurs
}
 


