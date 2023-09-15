import { Router } from "express";
import addCartIDToUser from "../controllers/userCart.controller";

const router = Router();

//Ruta que agrega el id del carrito al usuario
router.post("/", addCartIDToUser);

export default router;
