import {Router} from "express"
import { methodsUsers } from "../controladores/usuarios.controller.js";

const router = Router();

router.post("/usuarios", methodsUsers.createUser);
router.get("/usuarios", methodsUsers.getUsuarios);


export default router;  