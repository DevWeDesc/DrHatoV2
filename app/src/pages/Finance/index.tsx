
import { useState } from 'react'
import Modal from 'react-modal'
import { Dashboard } from './Dashboard'
import { Header } from './Header'
import { ModalTransaction } from './ModalTransaction'
import { TransactionsProvider } from '../../contexts/TransactionContext'
import { FinanceGlobalStyle } from '../../styles/FinanceStyle'

Modal.setAppElement('#root')

export function Finance() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }
  return (
    <TransactionsProvider>
      <Header onOpenModal={openModal} />
      <Dashboard />
      <ModalTransaction isOpen={isModalOpen} onRequestClose={closeModal} />
      <FinanceGlobalStyle />
    </TransactionsProvider>
  )
}