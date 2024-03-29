import { extendTheme } from "@chakra-ui/react"

 const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  white: '#FFF',
  'gray-50': "#F6F9FF",
  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#a6dc1e',
  'green-400': '#96C818',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-500': '#AB222E',
  'red-700': '#7A1921',

  'yellow-500': '#FBA94C',
  'yellow-700': 'yellow',
  
}
export const defaultTheme = extendTheme({ config })
