import styled from "styled-components";


export const WorkSpaceContainer = styled.div`
height: 100%;
width: 100%;
background-color: white;
`
export const WorkSpaceHeader = styled.header`
width: 100%;
height: 10vh;
background-color: gray;

`
export const WorkSpaceContent = styled.div `
width: 100%;
height: 90vh;
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
  background: cyan;
}
.div2 {
  background: purple;
}
.div3 {
  background: orange;
}
.div4 {
  background: yellow;
}
`