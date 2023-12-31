import { createGlobalStyle } from 'styled-components'

export const FinanceGlobalStyle = createGlobalStyle`
:root {
  --background: #fff;
  --red: #E52E4D;
  --headerbg: #fff;

  --blue-light: #6933FF;

  --text-title: #363F5F;
  --text-body: #969CB3;

  --shape: #FFFFFF

  --font-color: #;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}
html {
  @media (max-width: 108px) {
    font-size: 93.75%;
  }

  @media (max-width: 720px) {
    font-size: 87.5%;
  }
}
body {

  background: var(--background);
 
  -webkit-font-smoothing: antialiased;
}
// Font Styles
body, input, textarea, button {
  font-family: 'Rob', sans-serif;
  font-weight: 400;
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: 600;
}
// Font Styles End

button {
  cursor: pointer;
}

 [disabled] {
  opacity: 0.6;
  cursor: not-allowed;
 }

 .reactModal {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    
 }

 .reactModalContent {
  width: 100%;
  max-width: 576px;
  background: #fff;
  padding: 3rem;
  position: relative;
  border-radius: 1rem;
  border: 1px solid black;
 }
.modalClose {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }








`
