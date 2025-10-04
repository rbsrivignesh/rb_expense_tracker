require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./confg/db");

const router = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");

const app = express();

//middleware to handle cors

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB()
app.use("/api/v1/auth", router)
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});

