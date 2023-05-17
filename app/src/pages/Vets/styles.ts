import styled from "styled-components";


export const WorkSpaceContainer = styled.div`
height: 100%;
width: 100%;
background-color: white;
`
export const WorkSpaceHeader = styled.header`
width: 100%;
height: 10vh;
background-color: #eaeaea;

`

export const WorkSpaceFooter = styled.footer`
width: 100%;
height: 10vh;
background-color: #eaeaea;
`
export const WorkSpaceContent = styled.div `
width: 100%;
height: 80vh;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
.div1 { grid-area: 1 / 1 / 3 / 3; }
.div2 { grid-area: 1 / 3 / 3 / 5; }
.div3 { grid-area: 3 / 1 / 5 / 3; }
.div4 { grid-area: 3 / 3 / 5 / 5; }

.div1 {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.div2 {
  border-bottom: 1px solid black;
}
.div3 {
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
 
}
.div4 {

}

`