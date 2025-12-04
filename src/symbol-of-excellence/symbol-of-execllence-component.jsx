import React from "react";
import { SymbolOfExcellenceStyle } from "./symbol-of-excellence-style";
const SymbolOfExcellenceComponent = () => {
  return (
    <SymbolOfExcellenceStyle>
      <div className="element__one">
        <h1 className="title">A Symbol of Excellence in Placement Training</h1>
        <p className="para">
          Aptitude Guru Hem was born from the aspiration to create a learning
          environment that inspires greatness. Our founder, driven by personal
          experiences and a desire to make a difference, established the company
          with a mission to empower students with the right skills and mindset
          for success.
        </p>
      </div>
      <div className="element__two">
        <div className="element__two__child">
          <h2 className="sub__title">Our Vision</h2>
          <p className="details">
            Our vision is to empower individuals from diverse backgrounds to
            become accomplished professionals. At Aptitude Guru Hem, we believe
            that knowledge has the power to transcend boundaries.
          </p>
        </div>
        <div className="element__two__child">
          <h2
            className="sub__title"
            style={{ color: "aqua", borderLeft: "4px solid aqua" }}
          >
            Our Mission
          </h2>
          <p className="details">
            Our mission is to revolutionize education by providing comprehensive
            training in aptitude, coding, and web/mobile development. We foster
            a culture of inclusivity and personal growth.
          </p>
        </div>
      </div>
    </SymbolOfExcellenceStyle>
  );
};
export default SymbolOfExcellenceComponent;
