import styled from "styled-components";

export const WorkSpaceContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;
export const WorkSpaceHeader = styled.header`
  width: 100%;
  /* height: 10vh; */
  /* background-color: #eaeaea; */
  @media (max-width: 1380px) {
    width: 100%;
    /* height: 20vh; */
  }
`;

export const WorkSpaceFooter = styled.footer`
  width: 100%;
  border-top: 1px solid black;
  padding: 10px 0;
  display: flex;
  padding-left: 8px;
  /* height: 10vh; */
  /* background-color: #eaeaea; */
`;
export const WorkSpaceContent = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    height: 75vh;
  }
  display: grid;

  @media (max-width: 1380px) {
    width: 100%;
    /* height: 100vh; */
  }

  @media (min-width: 1024px) {
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    .div1 {
      grid-area: 1 / 1 / 3 / 3;
    }
    .div2 {
      grid-area: 1 / 3 / 3 / 5;
    }
    .div3 {
      grid-area: 3 / 1 / 5 / 3;
    }
    .div4 {
      grid-area: 3 / 3 / 5 / 5;
    }
    /* height: 100vh; */
  }

  @media (max-width: 624px) {
    .div1 {
      grid-area: span 1;
    }
    .div2 {
      grid-area: span 1;
    }
    .div3 {
      grid-area: span 1;
    }
    .div4 {
      grid-area: span 1;
    }
  }

  .div1 {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    /* overflow: auto; */
  }
  .div2 {
    border-bottom: 1px solid black;
  }
  .div3 {
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .div4 {
    overflow: hidden;
    @media (max-width: 768px) {
      border-top: 1px solid black;
    }
    padding: 1rem 0;
  }
`;
