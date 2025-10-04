const express= require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addIncome, getAllIncome, downloadIncomeExcel, deleteIncome } = require("../controllers/incomeController");

const incomeRoutes = express.Router();

incomeRoutes.post("/add",protect,addIncome)
incomeRoutes.get("/get",protect,getAllIncome)
incomeRoutes.get("/download-excel",protect,downloadIncomeExcel)
incomeRoutes.delete("/:id",protect,deleteIncome)

module.exports = incomeRoutes