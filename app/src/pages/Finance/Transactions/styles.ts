import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 4rem;
  table {
    width: 100%;
    border-spacing: 0.5rem;
    color: black;
    th {
      color: black;
      font-weight: 500;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
      border: solid 1px #006400;
      border-radius: 0.75rem;
      background: #fff;
    }
    td {
      padding: 1rem 2rem;
      border: solid 1px #006400;
      background: #fff;
      color: black;
      border-radius: 0.5rem;
      &:first-child {
        color: black;
        font-weight: bold;
      }
      &.deposit {
        color: #00a000;
       font-weight: bold;
      }
      &.withdraw {
        color: #ff0000;
        font-weight: bold;
      }
    }
  }
`
