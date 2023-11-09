async function removerPontosELetras(string, tamanhoMaximo) {
  const regex = /[^0-9]/g;

  if(typeof string === undefined) {
    return string = "Atualizar";
  }
  
  if (string.trim().length > tamanhoMaximo) {
    return string = "Falha de cadastro"
 }

 return string.replace(regex, "");
}


console.log(removerPontosELetras("51516 AVS0000000000000", 10))