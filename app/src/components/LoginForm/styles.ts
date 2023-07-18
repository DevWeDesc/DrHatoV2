import styled from "styled-components";

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  align-items: start;
  justify-content: space-between;
  width: 120%;
  .submitLogin {
    display: flex;
    flex-direction: column;
    gap: 0rem;
    width: 100%;
    text-align: center;

    input {
      border: 1px solid darkgray;
      font-size: 1rem;
      width: 100%;
      color: black;
      padding: 10px 5px;
      border-radius: 4px;
      text-align: center;
    }
  }
  label {
    color: ${(props) => props.theme["gray-600"]};
    font-size: 1.1rem;
    font-weight: bold;
  }

  input:focus {
    outline: none;
  }
  button {
    margin-top: 1rem;
    font-size: 1.3rem;
    width: 100%;
    padding: 0.4rem;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    background-color: #98d90d;
    transition: 0.2s;
    color: white;
    &:hover {
      background-color: #abd94a;
    }
  }

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["green-300"]};
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
`;
