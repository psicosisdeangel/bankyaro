// routes/transferencias.routes.js
import { Router } from "express";
import { transferirSaldo } from "../controllers/transferencias.controller.js";

const router = Router();

router.post("/", transferirSaldo);

export default router;
