import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
  } from 'react'
  import { api } from '../lib/axios'
  
  export const TransactionsContext = createContext<TransactionsContextFormat>(
    {} as TransactionsContextFormat
  )
  
  interface Transaction {
    id: number
    title: string
    amount: number
    type: string
    category: string
    createdAt: string
  }
  
  type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>
  
  interface TransactionsProviderProps {
    children: ReactNode
  }
  
  interface TransactionsContextFormat {
    transactions: Transaction[]
    createTransaction: (transaction: TransactionInput) => Promise<void>
  }
  export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, SetTransactions] = useState<Transaction[]>([])
    useEffect(() => {
      api
        .get('/transactions')
        .then(response => SetTransactions(response.data))
    }, [])
  
    async function createTransaction(transactionInput: TransactionInput) {
      const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date()
      })
      const { transaction } = response.data
  
      SetTransactions([...transactions, transaction])
    }
  
    return (
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
        {children}
      </TransactionsContext.Provider>
    )
  }
  
  export function useTransactions() {
    const context = useContext(TransactionsContext)
  
    return context
  }