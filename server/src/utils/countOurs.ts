
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)


/*
function calcularValorAcrescentado() {
    // Define a hora de referência (pode ser a hora atual ou uma hora específica)
    const horaDeReferencia: any = new Date('2023-07-23T00:12:00'); // Substitua pela hora desejada
  
    // Obtém a hora atual
    const horaAtual: any = new Date();
  
    // Calcula o tempo decorrido em milissegundos
    const tempoDecorrido = horaAtual - horaDeReferencia;
  
    // Define o valor do acréscimo (100) e o intervalo de tempo (12 horas em milissegundos)
    const valorAcrescentado = 100;
    const intervaloDeTempo = 12 * 60 * 60 * 1000;
  
    // Calcula quantos intervalos de tempo completos ocorreram desde a hora de referência
    const intervalosCompletos = Math.floor(tempoDecorrido / intervaloDeTempo);
  
    // Se ainda não passou a primeira hora de tolerância, não acrescenta nada
    const primeiraHoraDeTolerancia = 1 * 60 * 60 * 1000;
    if (tempoDecorrido <= primeiraHoraDeTolerancia) {
      return 0;
    }
  
    // Calcula o valor total acrescentado
    const valorTotalAcrescentado = intervalosCompletos * valorAcrescentado;
  
    return valorTotalAcrescentado;
  }
  */
  


// MINHA FUDENDO FUNÇÃO SEM AJUDA DA PORRA DO GEPETO
function getDiferrenceBetweenOurs() {

}

const fullDate = dayjs(new Date())
const finalDate = dayjs(new Date('2023-07-24T23:44:14.705Z'))
const actualOur = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}).format(fullDate)
const endOur =  new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}).format(finalDate)
const differenceBetweenDates = finalDate.diff(fullDate, 'minute')


console.log("FULLDATE", actualOur)
console.log("FULLDATE", endOur)
console.log("DIFERENCE", differenceBetweenDates)

/// PEGAR DIFERENÇA DE MINUTOS A PARTIR DE 60 PODE CONTAR MINUTES > 60 +++