// src/components/cart.jsx
import React from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 2rem;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15),
    0 5px 10px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 600px;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.25),
      0 10px 20px rgba(139, 92, 246, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #8b5cf6, #a78bfa, #c4b5fd);
    border-radius: 20px 20px 0 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  z-index: 1;
`;

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3),
    0 0 0 4px rgba(139, 92, 246, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.4),
      0 0 0 4px rgba(139, 92, 246, 0.2);
  }
`;

const QuoteIconLeft = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
  z-index: 2;
`;

const QuoteIconRight = styled(QuoteIconLeft)`
  left: auto;
  right: -10px;
  top: auto;
  bottom: -10px;
`;

const Name = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const JobContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  color: #8b5cf6;
  flex-wrap: wrap;
`;

const Job = styled.p`
  font-size: 1.1rem;
  color: #8b5cf6;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  align-items: center;
  justify-content: center;
`;

const Star = styled(FaStar)`
  filter: drop-shadow(0 2px 3px rgba(251, 191, 36, 0.3));
`;

const ReviewContainer = styled.div`
  position: relative;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  border: 1px solid #f3f4f6;
`;

const ReviewText = styled.p`
  font-size: 1.15rem;
  color: #4b5563;
  line-height: 1.7;
  font-style: italic;
  position: relative;
  z-index: 1;
  margin: 0;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: radial-gradient(#8b5cf6 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 16px;
  pointer-events: none;
`;

const Company = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(139, 92, 246, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: #7c3aed;
  font-weight: 500;
  font-size: 0.95rem;
`;

const Card = ({ review }) => {
  if (!review) return null;

  return (
    <CardContainer>
      <ImageContainer>
        <ProfileImage
          src={review.image}
          alt={review.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              review.name
            )}&background=8b5cf6&color=fff&size=200&bold=true`;
          }}
        />
        <QuoteIconLeft>
          <FaQuoteLeft />
        </QuoteIconLeft>
        <QuoteIconRight>
          <FaQuoteRight />
        </QuoteIconRight>
      </ImageContainer>

      <Name>{review.name}</Name>

      <JobContainer>
        <Job>{review.job}</Job>
        {review.company && (
          <Company>
            <MdLocationCity />
            {review.company}
          </Company>
        )}
      </JobContainer>

      <Rating>
        {[...Array(5)].map((_, i) => (
          <Star key={i} color={i < review.rating ? "#fbbf24" : "#e5e7eb"} />
        ))}
        <span
          style={{ marginLeft: "0.5rem", color: "#f59e0b", fontWeight: "600" }}
        >
          {review.rating.toFixed(1)}
        </span>
      </Rating>

      <ReviewContainer>
        <BackgroundPattern />
        <ReviewText>"{review.text}"</ReviewText>
      </ReviewContainer>
    </CardContainer>
  );
};

export default Card;
