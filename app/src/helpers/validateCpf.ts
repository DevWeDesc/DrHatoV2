export function validateCpf(cpf: string): boolean {
    // Remover caracteres não numéricos
    const cpfLimpo = cpf.replace(/\D/g, '');
  
    // Verificar se o CPF tem 11 dígitos
    if (cpfLimpo.length !== 11) {
      return false;
    }
  
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }
  
    // Calcular os dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
  
    let resto = soma % 11;
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
  
    resto = soma % 11;
    const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  
    // Verificar se os dígitos verificadores estão corretos
    if (
      parseInt(cpfLimpo.charAt(9)) === digitoVerificador1 &&
      parseInt(cpfLimpo.charAt(10)) === digitoVerificador2
    ) {
      return true;
    } else {
      return false;
    }
  }
  

  

  