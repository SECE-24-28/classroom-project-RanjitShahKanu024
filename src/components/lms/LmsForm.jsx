import React, { useState } from "react";
import styled from "styled-components";
import {
  FiBook,
  FiUser,
  FiMail,
  FiPhone,
  FiCheck,
  FiDatabase,
} from "react-icons/fi";
import { enrollmentAPI } from "../../services/api";

const FormContainer = styled.div`
  width: 85vw;
  background: white;
  margin: 2.5rem auto;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const FormSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    background: white;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5cf6;
  font-size: 1.1rem;
`;

const CheckboxGroup = styled.div`
  margin: 1.5rem 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #374151;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin-top: 0.25rem;
  accent-color: #8b5cf6;
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const CheckboxText = styled.span`
  font-size: 0.95rem;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 1.5rem;
  animation: fadeIn 0.5s ease;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const DatabaseInfo = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const CourseOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CourseOption = styled.div`
  border: 2px solid ${(props) => (props.selected ? "#8b5cf6" : "#e5e7eb")};
  background: ${(props) =>
    props.selected ? "rgba(139, 92, 246, 0.1)" : "white"};
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #8b5cf6;
    transform: translateY(-2px);
  }
`;

const CourseTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const CourseDuration = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LmsForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const courses = [
    { id: "web-dev", name: "Full Stack Web Development", duration: "6 months" },
    {
      id: "data-science",
      name: "Data Science & Machine Learning",
      duration: "8 months",
    },
    { id: "mobile-dev", name: "Mobile App Development", duration: "4 months" },
    { id: "cyber-security", name: "Cyber Security", duration: "5 months" },
    {
      id: "cloud-computing",
      name: "Cloud Computing & DevOps",
      duration: "6 months",
    },
    { id: "ui-ux", name: "UI/UX Design", duration: "3 months" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (submissionError) setSubmissionError("");
  };

  const handleCourseSelect = (courseId) => {
    setFormData((prev) => ({
      ...prev,
      course: courseId,
    }));

    if (errors.course) {
      setErrors((prev) => ({
        ...prev,
        course: "",
      }));
    }
    if (submissionError) setSubmissionError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Send data to MongoDB backend
      const response = await enrollmentAPI.submitEnrollment(formData);

      setIsSubmitted(true);
      console.log("Data saved to MongoDB:", response.data);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: "",
          agreeToTerms: false,
        });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to submit:", error);
      setSubmissionError(
        error.response?.data?.error ||
          error.message ||
          "Failed to submit. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          <FiBook /> LMS Enrollment Form
        </FormTitle>
        <FormSubtitle>
          Join our learning community - Data saved to MongoDB
        </FormSubtitle>
      </FormHeader>

      {isSubmitted ? (
        <SuccessMessage>
          <SuccessIcon>
            <FiCheck />
          </SuccessIcon>
          <SuccessText>Enrollment Successful!</SuccessText>
          <p>Your data has been saved to MongoDB database.</p>
          <DatabaseInfo>
            <FiDatabase /> Data stored in: mongodb://localhost:27017/mern-db
          </DatabaseInfo>
          <p style={{ fontSize: "0.9rem", marginTop: "1rem", opacity: 0.9 }}>
            Form will reset in 5 seconds...
          </p>
        </SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fullName">Full Name *</Label>
            <InputContainer>
              <Icon>
                <FiUser />
              </Icon>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </InputContainer>
            {errors.fullName && (
              <ErrorMessage>⚠️ {errors.fullName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <InputContainer>
              <Icon>
                <FiMail />
              </Icon>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </InputContainer>
            {errors.email && <ErrorMessage>⚠️ {errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number *</Label>
            <InputContainer>
              <Icon>
                <FiPhone />
              </Icon>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength="10"
              />
            </InputContainer>
            {errors.phone && <ErrorMessage>⚠️ {errors.phone}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Select Course *</Label>
            <CourseOptions>
              {courses.map((course) => (
                <CourseOption
                  key={course.id}
                  selected={formData.course === course.id}
                  onClick={() => handleCourseSelect(course.id)}
                >
                  <CourseTitle>{course.name}</CourseTitle>
                  <CourseDuration>Duration: {course.duration}</CourseDuration>
                </CourseOption>
              ))}
            </CourseOptions>
            {errors.course && <ErrorMessage>⚠️ {errors.course}</ErrorMessage>}
          </FormGroup>

          <CheckboxGroup>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              <CheckboxText>
                I agree to the terms and conditions. Data will be stored in
                MongoDB database.
              </CheckboxText>
            </CheckboxLabel>
            {errors.agreeToTerms && (
              <ErrorMessage>⚠️ {errors.agreeToTerms}</ErrorMessage>
            )}
          </CheckboxGroup>

          {submissionError && (
            <ErrorMessage style={{ marginBottom: "1rem" }}>
              ⚠️ {submissionError}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                Saving to MongoDB...
              </>
            ) : (
              <>
                <FiDatabase />
                Save to MongoDB
              </>
            )}
          </SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default LmsForm;
