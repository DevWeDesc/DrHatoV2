import React, { useState } from "react"
import Modal from 'react-modal'

interface ModalTransactionProps {
  isOpen: boolean
  onRequestClose: () => void
  children: React.ReactNode
}
export function GenericModal({isOpen, onRequestClose, children}: ModalTransactionProps) {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (

    <Modal
     isOpen={isOpen}
     onRequestClose={onRequestClose}
     style={customStyles}
    >
      {children}
    </Modal>



 
  )
}