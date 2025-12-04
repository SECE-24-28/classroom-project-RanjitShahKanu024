import styled from "styled-components";
export const SymbolOfExcellenceStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .para {
    max-width: 1500px;
    text-align: center;
  }
  .element__two {
    display: flex;
    gap: 40px;
    max-width: 1280px;
    @media (max-width: 920px) {
      flex-direction: column;
    }
  }
  .title {
    text-align: center;
    font-weight: 600;
    font-size: 48px;
  }
  .para {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.8;
    font-family: "Work Sans", sans-serif;
    text-align: center;
    color: rgb(86, 102, 131);
  }
  .sub__title {
    color: rgb(243, 176, 79);
    // border-left: 4px solid rgb(243, 176, 79);
    border-left: 4px solid rgb(243, 176, 79);
    padding-left: 0.5rem;
  }
  .details {
    align-items: left;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;
    /* border: 10px solid red; */
    color: rgb(86, 102, 131);
  }
`;
