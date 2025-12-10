const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better logging
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();

// Schema for enrollments
const enrollmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
  enrolledAt: { type: Date, default: Date.now },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "LMS Server is running!",
    endpoints: {
      test: "GET /api/test",
      createEnrollment: "POST /api/enrollments",
      getEnrollments: "GET /api/enrollments",
      getEnrollment: "GET /api/enrollments/:id",
      updateEnrollment: "PUT /api/enrollments/:id",
      deleteEnrollment: "DELETE /api/enrollments/:id",
    },
  });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Create enrollment
app.post("/api/enrollments", async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json({
      success: true,
      message: "Enrollment saved to MongoDB!",
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Get all enrollments
app.get("/api/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ enrolledAt: -1 });
    res.json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET single enrollment by ID
app.get("/api/enrollments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid enrollment ID",
      });
    }

    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        error: "Enrollment not found",
      });
    }

    res.json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// UPDATE enrollment by ID
app.put("/api/enrollments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid enrollment ID",
      });
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Return updated document and validate
    );

    if (!updatedEnrollment) {
      return res.status(404).json({
        success: false,
        error: "Enrollment not found",
      });
    }

    res.json({
      success: true,
      message: "Enrollment updated successfully",
      data: updatedEnrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE enrollment by ID
app.delete("/api/enrollments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid enrollment ID",
      });
    }

    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);

    if (!deletedEnrollment) {
      return res.status(404).json({
        success: false,
        error: "Enrollment not found",
      });
    }

    res.json({
      success: true,
      message: "Enrollment deleted successfully",
      data: deletedEnrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB URI: ${process.env.MONGO_URI}`);
});
