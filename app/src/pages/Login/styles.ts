import styled

from "styled-components";
export const LoginContent = styled.main`
  max-width: 34rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  background: white;
  border-radius: 8px;
  color: ${props => props.theme['gray-800']};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  
`

export const FormLoginContainer = styled.div`
    width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ImageLoginContainer = styled.div`
  width: 50%;
  height: 100%;
 img {
  height: 100%;
  width: 100%;
 }
`