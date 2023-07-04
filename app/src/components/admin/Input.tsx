import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction} from 'react'
import { FieldError } from "react-hook-form";
import { ref } from "yup";


interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | any
} 

const InputBase: ForwardRefRenderFunction<HTMLInputElement,InputProps> = ({name, label, error = null, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
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
        { !!error && (
         <FormErrorMessage color="red" fontWeight="bold" justifyContent="center">
          {error.message}
         </FormErrorMessage>
       )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)