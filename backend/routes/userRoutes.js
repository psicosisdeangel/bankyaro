import express from "express";
import { registerUser1, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/usuario", registerUser1);

export default router;