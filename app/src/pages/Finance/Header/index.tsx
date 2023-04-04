import logo from  '../../../assets/logoPadronizada.png'
import { Container, Content } from './styles'
import { Link } from 'react-router-dom'

interface HeaderProps {
  onOpenModal: () => void
}
export function Header({ onOpenModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="Dr hato" />
        </div>

      <Link to="/Home/Recepcao">
      <button type="button">
          Voltar
        </button>
      </Link>
        
        <button type="button" onClick={onOpenModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  )
}