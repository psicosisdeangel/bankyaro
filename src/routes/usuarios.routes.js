import {Router} from "express"
import { methodsUsers } from "../controladores/usuarios.controller.js";

const router = Router();

router.get("/suarios", methodsUsers.createUser);

export default router;