import React from "react";
import { FlexStyle } from "./flex-box-style";
const FlexBoxComponent = () => {
  return (
    <FlexStyle>
      <div className="parent">
        <div className="square__child"></div>
        <div className="square__child"></div>
        <div className="square__child"></div>
        <div className="square__child"></div>
      </div>
    </FlexStyle>
  );
};
export default FlexBoxComponent;
