import styled from 'styled-components'

export const Container = styled.header`
  background: var(--headerbg);
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div,
  h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
  }
  span {
    color: #008080;
    text-shadow: 0 0 0.8em #50c878;
  }
  span:hover {
  }
  button {
    font-size: 1rem;
    color: #fff;
    background: #50c878;
    border: solid 2px black;
    padding: 0 2rem;
    border-radius: 0.75rem;
    height: 3rem;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
  img {
    
    
  }
`
