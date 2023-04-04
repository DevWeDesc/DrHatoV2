import { Container } from './styles'
import { ArrowCircleUp, ArrowCircleDown, Money } from 'phosphor-react'
import { TransactionsContext } from "../../../contexts/TransactionContext"
import { useContext } from 'react'

export function Summary() {
  const { transactions } = useContext(TransactionsContext)
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type == 'deposit') {
        acc.deposits += Number(transaction.amount)
        acc.total += Number(transaction.amount)
      } else {
        acc.withdraws += Number(transaction.amount)
        acc.total -= Number(transaction.amount)
      }
      return acc
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0
    }
  )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <ArrowCircleUp color="#50c878" size={32} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <ArrowCircleDown color="#f72606" size={32} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <Money color="#06f766" size={42} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}