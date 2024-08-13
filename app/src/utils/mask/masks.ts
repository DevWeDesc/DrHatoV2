export const normalizePhoneNumber = (value: String | undefined) => {
  if (!value) return ''
  
  return value.replace(/[\D]/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)/, '$1')
}

export const normalizeCpf = (value: string | undefined) => {
  if (!value) return ''

  value = value.replace(/[\D]/g, '')
  value = value.slice(0, 11)

  return value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
}

export const normalizeCurrency = (value: string | undefined) => {
  if (!value) return 'R$ 0,00'; // Valor padrão se não houver entrada


  value = value.replace(/[\D]/g, '');

  // Converte o valor para formato monetário com duas casas decimais
  value = (parseFloat(value) / 100).toFixed(2);

  // Adiciona separadores de milhar e formata o valor
  value = value
    .replace('.', ',') // Converte ponto decimal para vírgula
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.'); // Adiciona ponto como separador de milhar

  // Adiciona o símbolo de moeda BRL
  return `R$ ${value}`;
};