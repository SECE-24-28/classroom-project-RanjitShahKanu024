import styled from "styled-components";
export const TrustedByStyle = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  h1 {
    text-align: center;
    margin-bottom: 50px;
  }
  .parent {
    display: flex;
    justify-content: space-evenly;
    // gap: 100px;
  }
  .numbers {
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: gray;
  }
  .details {
    text-align: center;
    font-size: 20px;
    color: gray;
    font-weight: 500;
  }
  .child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
    width: 230px;
    height: 200px;
  }
`;
