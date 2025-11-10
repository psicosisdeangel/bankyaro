import { Router } from "express";
import { methodsUsers } from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/", methodsUsers.createUser);
router.get("/", methodsUsers.getUsuarios);
router.get("/", methodsUsers.obtenerBalance);
// rutas de usuarios
router.get("/:usuarioId", methodsUsers.getUsuarioById);


export default router;
