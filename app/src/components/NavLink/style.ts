import styled

from "styled-components";

interface LinkContainerProps {
  direction: "column" | "row"
}
export const LinkContainer = styled.div<LinkContainerProps>`
display: flex;
flex-direction: ${props => props.direction || 'column'};

a{
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
 
  align-items: center;
  text-align: center;
  line-height: 1.25rem;
  color: black;
  text-decoration: none;
  padding: 0.5rem;
}

a:active {
  color: #86B71F;
}

h2 {

  font-size: 24px;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
}

`