import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiX, FiSave, FiUser, FiMail, FiPhone, FiBook } from "react-icons/fi";
import { enrollmentAPI } from "../../services/api";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
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
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    background: white;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5cf6;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    background: white;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1.5rem 0;
`;

const CheckboxInput = styled.input`
  margin-top: 0.25rem;
  accent-color: #8b5cf6;
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 0.95rem;
  color: #374151;
  cursor: pointer;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #4b5563;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LoadingSpinner = styled.div`
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

const EditModal = ({ enrollmentId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (enrollmentId) {
      fetchEnrollmentData();
    }
  }, [enrollmentId]);

  const fetchEnrollmentData = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getEnrollmentById(enrollmentId);
      setFormData(response.data);
    } catch (error) {
      console.error("Failed to fetch enrollment:", error);
      alert("Failed to load enrollment data");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      const response = await enrollmentAPI.updateEnrollment(
        enrollmentId,
        formData
      );

      alert("Enrollment updated successfully!");
      onUpdate(response.data); // Notify parent component
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to update enrollment:", error);
      alert(error.response?.data?.error || "Failed to update enrollment");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ModalOverlay>
        <ModalContent>
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <LoadingSpinner />
            <p style={{ marginTop: "1rem", color: "#6b7280" }}>
              Loading enrollment data...
            </p>
          </div>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <FiBook /> Edit Enrollment
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

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
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
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
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
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
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
              />
            </InputContainer>
            {errors.phone && <ErrorMessage>⚠️ {errors.phone}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="course">Select Course *</Label>
            <Select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.duration})
                </option>
              ))}
            </Select>
            {errors.course && <ErrorMessage>⚠️ {errors.course}</ErrorMessage>}
          </FormGroup>

          <CheckboxGroup>
            <CheckboxInput
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              I agree to the terms and conditions
            </CheckboxLabel>
          </CheckboxGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit" disabled={saving}>
              {saving ? (
                <>
                  <LoadingSpinner />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </SaveButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditModal;
