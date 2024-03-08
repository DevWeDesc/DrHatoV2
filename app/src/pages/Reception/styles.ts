import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "section-1"
    "section-2"
    "section-3"
    "section-4"
    "section-5";
  .section-1 {
    grid-area: section-1;
  }

  .section-2 {
    grid-area: section-2;
  }

  .section-3 {
    grid-area: section-3;
  }

  .section-4 {
    grid-area: section-4;
  }

  .section-5 {
    grid-area: section-5;
  }

  background-color: white;
  padding: 1rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;
    @media (max-width: 680px) {
      flex-direction: column;
      gap: 30px;
      padding: 30px 0;
    }
  }
  .container img {
    margin: 1rem;
    border-radius: 4px;
    height: 200px;
    width: 260px;
  }

  .buttonsContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .imgContainer {
    display: flex;
    gap: 1rem;

    @media (max-width: 680px) {
      align-items: center;
      flex-direction: column;
    }
  }

  .imgContainer h1 {
    font-size: 28px;
    text-shadow: 1px 1px 1px black;
  }
`;
