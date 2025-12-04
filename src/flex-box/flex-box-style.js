import styled from "styled-components";
export const FlexStyle = styled.div`
  .parent {
    display: flex;

    background-color: green;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100vh;
    @media (max-width: 920px) {
      flex-direction: column;
    }
  }
  .square__child {
    width: 50px;
    height: 50px;
    background-color: yellow;
  }
  .square__rectangle {
    width: 100px;
    height: 100px;
    background-color: aqua;
    @media (max-width: 900px) {
      display: none;
    }
  }
`;
