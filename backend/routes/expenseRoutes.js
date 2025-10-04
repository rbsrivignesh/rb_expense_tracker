const express= require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addExpense, getAllExpense, downloadExpenseExcel, deleteExpense } = require("../controllers/expenseController");

const expenseRoutes = express.Router();

expenseRoutes.post("/add",protect,addExpense)
expenseRoutes.get("/get",protect,getAllExpense)
expenseRoutes.get("/download-excel",protect,downloadExpenseExcel)
expenseRoutes.delete("/:id",protect,deleteExpense)

module.exports = expenseRoutes