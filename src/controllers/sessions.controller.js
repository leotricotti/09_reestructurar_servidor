import * as dotenv from "dotenv";
import { createHash } from "../utils.js";
import { USERSDAO } from "../dao/index.dao.js";

//Inicializa servicios
dotenv.config();

//Ruta que realiza el registro
async function singupUser(req, res) {
  res.status(200).json({ message: "Usuario creado con éxito" });
}

//Ruta que se ejecuta cuando falla el registro
async function failRegister(req, res) {
  res.status(500).json({ error: "Error al crear el ususario" });
}

//Ruta que realiza el login
async function loginUser(req, res) {
  if (!req.user) {
    return res.status(401).json("Error de autenticacion");
  }
  req.session.user = {
    first_name: req.user[0].first_name,
    last_name: req.user[0].last_name,
    email: req.user[0].email,
    age: req.user[0].age,
    role: req.user[0].role,
  };
  res.status(200).json({ message: "Usuario logueado con éxito" });
}

//Ruta que recupera la contraseña
async function forgotPassword(req, res) {
  const { username, newPassword } = req.body;

  const result = await USERSDAO.getOne(username);
  if (result.length === 0)
    return res.status(401).json({
      respuesta: "El usuario no existe",
    });
  else {
    const updatePassword = await usersManager.updatePassword(
      result[0]._id,
      createHash(newPassword)
    );
    res.status(200).json({
      respuesta: "Contrseña actualizada con éxito",
    });
  }
}

//Ruta que cierra la sesión
const handleLogout = (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect("/");
  });
};

//Callback de github
async function githubCallback(req, res) {
  req.session.user = req.user;
  res.redirect("/api/products?page=1");
}

export {
  singupUser,
  failRegister,
  loginUser,
  forgotPassword,
  githubCallback,
  handleLogout,
};
