const express= require("express");
const { protect } = require("../middlewares/authMiddleware");
const { dashboardData } = require("../controllers/dashboardController");
const dashboardRouter =express.Router();
dashboardRouter.get("/", protect,dashboardData)
module.exports = dashboardRouter;
