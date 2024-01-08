import styled from "styled-components";
export const HomeContainer = styled.div`
  display: grid;
  align-items: flex-start;
  @media (max-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-template-columns: repeat(5, 1fr);
  gap: 0px 0px;
  background-color: ${(props) => props.theme["gray-50"]};
  scroll-behavior: auto;
  .section-1 {
    @media (max-width: 620px) {
      grid-column: 1/3;
    }
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 1rem;
    background-color: white;
    width: 100%;
    max-width: 100vw;
  }

  .section-2 {
    grid-column: 2/6;
    @media (max-width: 620px) {
      grid-column: 1/3;
    }
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;
    gap: 1rem;
  }

  .cards {
    width: 100%;
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 1500px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1220px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 620px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .dropMenu {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .acordionTitle {
    font-size: 18px;
    padding: 1rem;
    transition: all 0.2s;
  }

  .acordionTitle:hover {
    color: #8eda7c;
    background-color: ${(props) => props.theme["gray-50"]};
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
    color: ${(props) => props.theme["gray-700"]};
  }

  .submenus ul li:hover {
    color: #8eda7c;
  }
`;
