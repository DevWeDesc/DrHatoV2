import styled

from "styled-components";

export const CardNavigationContainer = styled.div`
align-items: center;
justify-content: center;
width: 320px;
height: 220px;
border-radius: 8px;
display: flex;
flex-direction: column;
background-color: white;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

 h2  {
    font-size: 18px;
    font-weight: bold;
    margin: 1rem;
 }

 p {
    margin: 1rem;
 }
.navBall {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color:  ${props => props.theme['gray-50']};
    margin:1rem;
    height: 68px;
    width: 68px;
    border-radius: 100%;
}
.navContainer, img {
  display: flex;
  flex-direction: column;
  align-items: center;
}

`