import passport from "passport";
import * as dotenv from "dotenv";
import { Router } from "express";
import { createHash } from "../utils.js";
import User from "../dao/dbmanager/users.manager.js";
import {
  singupUser,
  failRegister,
  loginUser,
  forgotPassword,
  githubCallback,
  handleLogout,
} from "../controllers/sessions.controller.js";

//Inicializa servicios
dotenv.config();
const router = Router();
const usersManager = new User();

//Ruta que realiza el registro
router.post(
  "/signup",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failRegister",
  }),
  singupUser
);

//Ruta que se ejecuta cuando falla el registro
router.get("/failRegister", failRegister);

//Ruta que realiza el login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/failLogin",
  }),
  loginUser
);

//Ruta que recupera la contraseña
router.post("/forgot", forgotPassword);

//Ruta que cierra la sesión
router.get("/logout", handleLogout);

//Ruta que realiza el login con github
router.get(
  "/github",
  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    async (req, res) => {}
  )
);

//Callback de github
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallback
);

export default router;
