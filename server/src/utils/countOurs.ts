const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

const fullDate = dayjs(new Date())
const finalDate = dayjs(new Date("2023-08-02T23:44:14.705Z"))
//@ts-ignore
const actualOur = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}).format(fullDate)
//@ts-ignores
const endOur =  new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}).format(finalDate)
const differenceBetweenDates = finalDate.diff(fullDate, 'minute')

const dayAdd = 300;
let total = 0;
if(differenceBetweenDates > 60) {
 const toPay = (differenceBetweenDates / 720) * (dayAdd/2)
  total+= toPay
} else {
  total = 0;
}

console.log("TOTAL DA CONTA A PAGAR", total)


console.log("DATA DE ENTRADA", actualOur)
console.log("DATA DE SAIDA", endOur)
console.log("DIFERENCE", differenceBetweenDates)

/// PEGAR DIFERENÇA DE MINUTOS A PARTIR DE 60 PODE CONTAR MINUTES > 60 +++