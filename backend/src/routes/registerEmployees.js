import express, { Router } from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";

const router = express.Router();

router.route("/").post(registerEmployeesController.register);
router.route("/verifyCodeEmail").post(registerEmployeesController.verifyCode);

export default router;