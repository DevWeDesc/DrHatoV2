import styled from 'styled-components'
import { darken } from 'polished'
export const Container = styled.form`
  h2 {
    color: black;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: #fff;
    color: black;
    border-radius: 0.75rem;
    border: 1px solid green;
    font-size: 1rem;
    margin-top: 1.5rem;
    transition: filter 0.3s;
    font-weight: 600;
    &:hover {
      filter: brightness(0.9);
    }
  }
  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.75rem;
    border: 1px solid green;
    background: transparent;
    color: black;
    font-weight: 400;
    font-size: 1rem;
    &::placeholder {
      color: black;
    }
    & + input {
      margin-top: 1rem;
    }
  }
`

export const ModalButtonsContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

interface RadioBoxProps {
  isChecked: boolean
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.5rem;
  background: ${props => (props.isChecked ? '#008656' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')};
  }
  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1.25rem;
    color: black;

    font-weight: bold;
  }
`
