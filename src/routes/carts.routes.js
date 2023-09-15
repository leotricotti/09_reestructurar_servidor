import { Router } from "express";
import {
  getAll,
  getOne,
  createCart,
  addProduct,
  deleteProduct,
  emptyCart,
  popuatedCartd,
} from "../controllers/carts.controller.js";

//Inicializar servicios
const router = Router();

//Método asyncrono para obtener todos los carritos
router.get("/", getAll);

//Método asyncrono para obtener un carrito
router.get("/:cid", getOne);

//Método asyncrono para crear un carrito
router.post("/", createCart);

//Método asyncrono para agregar productos al carrito
router.post("/:cid/product/:pid", addProduct);

//Método asyncrono para eliminar productos del carrito
router.delete("/:cid/product/:pid", deleteProduct);

//Método asyncrono para vaciar el carrito
router.delete("/:cid", emptyCart);

export default router;
