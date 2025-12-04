import React from "react";
import { TrustedByStyle } from "./trusted-by-style";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrustedbyComponent = () => {
  return (
    <TrustedByStyle>
      <h1>Trusted By</h1>
      <div className="parent">
        <div className="child">
          <FontAwesomeIcon icon={faBuildingColumns} />

          <span className="numbers">100+</span>
          <br></br>
          <span className="details">Colleges</span>
        </div>
        <div className="child">
          <span className="numbers">150</span>
          <br></br>
          <span className="details">Professional Trainers</span>
        </div>
        <div className="child">
          <span className="numbers">1000+</span>
          <br></br>
          <span>Study Materials</span>
        </div>
        <div className="child">
          <span className="numbers"> 100000+</span>
          <br></br>
          <span className="details">Students</span>
        </div>
      </div>
    </TrustedByStyle>
  );
};
export default TrustedbyComponent;
