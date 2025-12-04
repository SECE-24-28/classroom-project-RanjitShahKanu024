import styled from "styled-components";
export const PostionStyle = styled.div`
  position: absolute;
  .element {
    width: 300px;
    height: 300px;
    background-color: yellow;
    //position: sticky;
    position: relative;
    top: 100px;
    //left: 500px;
  }
  .element__one {
    width: 300px;
    height: 300px;
    background-color: green;
    margin-top: 20px;
  }
  .square {
    width: 1000px;
    height: 1000px;
    background-color: red;
    // position: absolute;
  }
  .square__element {
    background-color: yellow;
    width: 200px;
    height: 200px;
    position: relative;
    left: 1000px;
    top: 100px;
  }
`;
