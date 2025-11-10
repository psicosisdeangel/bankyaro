import express from "express";
import { registerUser1, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/usuarios", registerUser1);
router.post("/login", loginUser);

export default router;