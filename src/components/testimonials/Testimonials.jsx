// src/components/testimonials.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Card from "../cart/Cart.jsx";

const Container = styled.div`
  width: 85vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  padding: 2.5rem;
  transition: all 0.7s;
  border-radius: 0.375rem;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    width: 700px;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1.5rem;
  margin-left: auto;
  margin-right: auto;
`;

const NavButton = styled.button`
  cursor: pointer;
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
    background: linear-gradient(135deg, #7c3aed, #8b5cf6);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const PageIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const PageCount = styled.div`
  font-size: 1rem;
  color: #6d28d9;
  font-weight: 600;
  background: rgba(139, 92, 246, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  min-width: 80px;
  text-align: center;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#8b5cf6" : "#e5e7eb")};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$active ? "#7c3aed" : "#d1d5db")};
    transform: scale(1.2);
  }
`;

const SurpriseButtonContainer = styled.div`
  margin-top: 2rem;
`;

const SurpriseButton = styled.button`
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-weight: 700;
  color: white;
  font-size: 1.125rem;
  border: none;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #8b5cf6);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const Testimonials = (props) => {
  let reviews = props.reviews;
  const [index, setIndex] = useState(0);

  function leftShiftHandler() {
    if (index === 0) {
      setIndex(reviews.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function rightShiftHandler() {
    if (index === reviews.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function surpriseHandler() {
    let randomIndex = Math.floor(Math.random() * reviews.length);

    // Ensure we get a different testimonial than the current one
    while (randomIndex === index && reviews.length > 1) {
      randomIndex = Math.floor(Math.random() * reviews.length);
    }

    setIndex(randomIndex);
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      rightShiftHandler();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <Container>
      <Card review={reviews[index]} />

      <NavigationContainer>
        <NavButton onClick={leftShiftHandler} aria-label="Previous testimonial">
          <FiChevronLeft />
        </NavButton>

        <PageIndicator>
          <PageCount>
            {index + 1} / {reviews.length}
          </PageCount>
          <DotsContainer>
            {reviews.map((_, i) => (
              <Dot
                key={i}
                $active={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </DotsContainer>
        </PageIndicator>

        <NavButton onClick={rightShiftHandler} aria-label="Next testimonial">
          <FiChevronRight />
        </NavButton>
      </NavigationContainer>

      <SurpriseButtonContainer>
        <SurpriseButton onClick={surpriseHandler}>Surprise Me</SurpriseButton>
      </SurpriseButtonContainer>
    </Container>
  );
};

export default Testimonials;
