import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiUsers, FiTrash2, FiEdit2, FiRefreshCw } from "react-icons/fi";
import { enrollmentAPI } from "../../services/api";
import EditModal from "./EditModal";

const AdminContainer = styled.div`
  width: 90vw;
  max-width: 1200px;
  background: white;
  margin: 2.5rem auto;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Tr = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.1rem;
`;

const NoData = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.1rem;
`;

const CourseBadge = styled.span`
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
`;

const EditButton = styled(ActionButton)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ActionCell = styled(Td)`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const AdminPanel = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getAllEnrollments();
      setEnrollments(response.data);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
      alert("Failed to load enrollments. Make sure backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) {
      return;
    }

    try {
      setDeletingId(id);
      await enrollmentAPI.deleteEnrollment(id);

      // Remove the deleted enrollment from state
      setEnrollments((prev) =>
        prev.filter((enrollment) => enrollment._id !== id)
      );
      alert("Enrollment deleted successfully!");
    } catch (error) {
      console.error("Failed to delete enrollment:", error);
      alert(error.response?.data?.error || "Failed to delete enrollment");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = (updatedEnrollment) => {
    // Update the enrollment in the list
    setEnrollments((prev) =>
      prev.map((enrollment) =>
        enrollment._id === updatedEnrollment._id
          ? updatedEnrollment
          : enrollment
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCourseName = (courseId) => {
    const courseNames = {
      "web-dev": "Web Development",
      "data-science": "Data Science",
      "mobile-dev": "Mobile Development",
      "cyber-security": "Cyber Security",
      "cloud-computing": "Cloud Computing",
      "ui-ux": "UI/UX Design",
    };
    return courseNames[courseId] || courseId;
  };

  if (loading) {
    return <Loading>Loading enrollments from MongoDB...</Loading>;
  }

  return (
    <>
      <AdminContainer>
        <Header>
          <Title>
            <FiUsers /> MongoDB Enrollments
          </Title>
          <RefreshButton onClick={fetchEnrollments} disabled={loading}>
            <FiRefreshCw />
            Refresh
          </RefreshButton>
        </Header>

        {enrollments.length === 0 ? (
          <NoData>
            No enrollments found in MongoDB. Submit a form to see data here.
          </NoData>
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Course</Th>
                <Th>Enrolled At</Th>
                <Th>Terms Accepted</Th>
                <Th style={{ textAlign: "right" }}>Actions</Th>
              </tr>
            </TableHeader>
            <tbody>
              {enrollments.map((enrollment) => (
                <Tr key={enrollment._id}>
                  <Td>{enrollment.fullName}</Td>
                  <Td>{enrollment.email}</Td>
                  <Td>{enrollment.phone}</Td>
                  <Td>
                    <CourseBadge>
                      {getCourseName(enrollment.course)}
                    </CourseBadge>
                  </Td>
                  <Td>{formatDate(enrollment.enrolledAt)}</Td>
                  <Td>{enrollment.agreeToTerms ? "✅ Yes" : "❌ No"}</Td>
                  <ActionCell>
                    <EditButton onClick={() => handleEdit(enrollment._id)}>
                      <FiEdit2 />
                      Edit
                    </EditButton>
                    <DeleteButton
                      onClick={() => handleDelete(enrollment._id)}
                      disabled={deletingId === enrollment._id}
                    >
                      {deletingId === enrollment._id ? (
                        <Spinner />
                      ) : (
                        <FiTrash2 />
                      )}
                      {deletingId === enrollment._id ? "Deleting..." : "Delete"}
                    </DeleteButton>
                  </ActionCell>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </AdminContainer>

      {editingId && (
        <EditModal
          enrollmentId={editingId}
          onClose={() => setEditingId(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default AdminPanel;
