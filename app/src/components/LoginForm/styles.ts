import styled
 from "styled-components";

 export const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .submitLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      
    }
    label {
        color: ${props => props.theme['gray-600']};
        font-weight: bold;
        font-size: 1.5rem;
    }
    input {
        border-radius: 4px;
        text-align: center;
        border: none;
        border: 1px solid gray;
    }
    input:focus {
        outline: none;
    }
    button {
        margin-top: 1rem;
        width: 200px;
        padding: 0.2rem;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        background-color:  ${props => props.theme['green-300']};
    }
    
    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme['green-300']};
        font-weight: bold;
       
    }
    .waving-hand {
  display: inline-block;
  animation: waving 1s ease-in-out infinite;
}

@keyframes waving {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
 `