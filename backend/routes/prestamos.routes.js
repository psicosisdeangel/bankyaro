import { Router } from "express";
import { crearPrestamo, obtenerPrestamos } from "../controllers/prestamos.controller.js";

const router = Router();

router.post("/", crearPrestamo);
router.get("/:usuarioId", obtenerPrestamos); 


export default router;
