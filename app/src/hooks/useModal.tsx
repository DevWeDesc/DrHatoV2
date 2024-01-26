import { createContext, useState, ReactNode } from "react";

type PropsContext = {
  children: ReactNode;
};

interface ModalProps {
  closeMedicineModal: () => void;
  closeInstructionModal: () => void;
  closeModal: () => void;
  closeAutorizationModal: () => void;
  closeEndQueueModal: () => void;
  closeMedicineRecordModal: () => void;
  closeCustomerDetailsModal: () => void;

  modalWeigthPet: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalWeigthPet: React.Dispatch<React.SetStateAction<boolean>>;
  setAutorizationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMedicineModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEndConsultQueue: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMedicineRecordOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCustomerDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  isMedicineRecordOpen: boolean;
  isModalOpen: boolean;
  isAutorizationModalOpen: boolean;
  insInstructionsModalOpen: boolean;
  isMedicineModalOpen: boolean;
  isEndConsultQueue: boolean;
  isCustomerDetailsOpen: boolean;
}
// Criar um contexto
export const ModalContext = createContext({} as ModalProps);

// Provedor do contexto que engloba o componente principal
export const ModalProvider = ({ children }: PropsContext) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutorizationModalOpen, setAutorizationModalOpen] = useState(false);
  const [insInstructionsModalOpen, setInstructionModalOpen] = useState(false);
  const [isMedicineModalOpen, setMedicineModalOpen] = useState(false);
  const [modalWeigthPet, setModalWeigthPet] = useState(false);
  const [isEndConsultQueue, setIsEndConsultQueue] = useState(false);
  const [isMedicineRecordOpen, setIsMedicineRecordOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);

  function closeMedicineRecordModal() {
    setIsMedicineRecordOpen(false);
  }

  function closeMedicineModal() {
    setMedicineModalOpen(false);
  }

  function closeInstructionModal() {
    setInstructionModalOpen(false);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function closeAutorizationModal() {
    setAutorizationModalOpen(false);
  }

  function closeEndQueueModal() {
    setIsEndConsultQueue(false);
  }

  function closeCustomerDetailsModal() {
    setIsCustomerDetailsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isMedicineRecordOpen,
        setIsMedicineRecordOpen,
        closeMedicineRecordModal,
        closeMedicineModal,
        closeInstructionModal,
        closeModal,
        closeAutorizationModal,
        modalWeigthPet,
        setModalWeigthPet,
        setAutorizationModalOpen,
        setInstructionModalOpen,
        setMedicineModalOpen,
        setIsModalOpen,
        insInstructionsModalOpen,
        isAutorizationModalOpen,
        isMedicineModalOpen,
        isModalOpen,
        isEndConsultQueue,
        setIsEndConsultQueue,
        closeEndQueueModal,
        closeCustomerDetailsModal,
        setIsCustomerDetailsOpen,
        isCustomerDetailsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
