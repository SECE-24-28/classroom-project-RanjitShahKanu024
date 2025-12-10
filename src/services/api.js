import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const enrollmentAPI = {
  // CREATE: Submit enrollment to MongoDB
  async submitEnrollment(enrollmentData) {
    try {
      const response = await API.post("/enrollments", enrollmentData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // READ: Get all enrollments from MongoDB
  async getAllEnrollments() {
    try {
      const response = await API.get("/enrollments");
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // READ: Get single enrollment by ID
  async getEnrollmentById(id) {
    try {
      const response = await API.get(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // UPDATE: Update enrollment by ID
  async updateEnrollment(id, enrollmentData) {
    try {
      const response = await API.put(`/enrollments/${id}`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // DELETE: Delete enrollment by ID
  async deleteEnrollment(id) {
    try {
      const response = await API.delete(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },
};
