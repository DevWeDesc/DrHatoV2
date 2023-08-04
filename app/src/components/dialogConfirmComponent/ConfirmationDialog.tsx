import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import React, { JSXElementConstructor, ReactElement } from 'react'

interface ConfirmationDialogProps {
  buttonTitle: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>
  whatIsConfirmerd: string
  describreConfirm: string
  callbackFn: any;
}

export function ConfirmationDialog({buttonTitle, icon, whatIsConfirmerd, describreConfirm, callbackFn}: ConfirmationDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button 
      leftIcon={icon}
      height={8}
      colorScheme='red' onClick={onOpen}>
        {buttonTitle}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {whatIsConfirmerd}
            </AlertDialogHeader>

            <AlertDialogBody>
              {describreConfirm}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => {onClose; callbackFn()}} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}