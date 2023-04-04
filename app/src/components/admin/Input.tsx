import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction} from 'react'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
} 

const InputBase: ForwardRefRenderFunction<HTMLInputElement,InputProps> = ({name, label, ...rest}, ref) => {
  return (
    <FormControl >
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput 
        name={name}
        id={name}
        focusBorderColor="green.200"
        border="1px"
        bgColor="white"
        variant="filled"
        _hover={{
          bgColor:'gray.100'
        }}
        ref={ref}
        {...rest}
        
        /> 
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)