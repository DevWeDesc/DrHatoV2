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