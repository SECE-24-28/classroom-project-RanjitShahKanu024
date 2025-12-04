import React from "react";
import { HelloWorldStyle } from "./hello-world-style";
const HelloWorldComponent = () => {
  return (
    <HelloWorldStyle>
      {/* <h1 className="element">Sri eshwar</h1> */}
      <div className="parent">
        <div className="square__child"></div>
        <div className="square__child"></div>
        <div className="square__child"></div>
        <div className="square__child"></div>
        <div className="square__rectangle"></div>
      </div>
    </HelloWorldStyle>
  );
};
export default HelloWorldComponent;
