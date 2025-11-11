import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import elementRoutes from "./routes/elements.routes.js";
import iconRoutes from "./routes/icon.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/api/elements", elementRoutes);
app.use("/api/icons", iconRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});