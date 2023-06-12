import styled

from "styled-components";
export const  HomeContainer = styled.div`
  display: grid; 
  
align-items: flex-start;
  grid-template-columns: 0.5fr 2fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "section-1 section-2 section-3"
    ". ."
    ". ."
    ". ."; 
background-color:   ${props => props.theme['gray-50']};
 
scroll-behavior: auto;
.section-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 1rem;
    
    background-color: white;
    height: 100vh; 
    width: 400px
}

.section-2 {
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
   width: 100%;
    gap: 1rem;
    
}

.section-3 {
    display: flex;
    margin: 1rem;
    width: 500px;
    height: 600px;
}


.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}



.dropMenu {

    display: flex;
    gap: 1rem;
    align-items: center;
}
.acordionTitle{
    font-size: 18px;
    padding: 1rem;
    transition: all 0.2s;
}

.acordionTitle:hover {
    color: #8eda7c;
    background-color: ${props => props.theme['gray-50']};
}
.submenus {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    color: black;

    font-size: 14px;
    font-weight: 700;
}

.submenus ul li {
    padding: 0.5rem;
    color:  ${props => props.theme['gray-700']};
}

.submenus ul li:hover {
    color: #8eda7c;
}


`


