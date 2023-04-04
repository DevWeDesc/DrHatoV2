import styled from "styled-components";
import { Box } from "@chakra-ui/react";

export const HeaderContainer = styled.header`
  height: 68px;
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
  align-items: center;
  text-align: center;
  background: ${(props) => props.theme["white"]};
  margin-bottom: 2px solid black;
  color: black;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  img {
    width: 200px;
  }
`;

export const StyledBox = styled(Box)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
