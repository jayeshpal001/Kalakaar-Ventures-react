const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const portfolioRoutes = require("./routes/portfolioRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
// const { errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Global Middlewares
app.use(cors()); 
app.use(express.json()); 

// API Routes
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/auth", authRoutes);

// Custom Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});