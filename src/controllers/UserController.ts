import { Router } from "express";
import { getUser, registerUser } from "../services/UserService";
import { sign } from "jsonwebtoken";
const UserController = Router();

UserController.post("/register", async (req, res) => {
  const user = req.body;

  // Validaciones
  if (!user.nombre || user.descripcion.length < 10) {
    res
      .status(400)
      .json({ message: "Los datos no son correctos por favor verificarlos" });
  }

  const createdUser = await registerUser(user);
  console.log(createdUser);

  // Genera un token JWT para el usuario autenticado
  const token = sign({ user: user }, "clavesupersegura123", {
    expiresIn: "2h",
  });

  return res
    .status(createdUser ? 201 : 500)
    .json(
      createdUser
        ? { token }
        : { message: "Ocurrió un problema intente mas tarde" }
    );
});

UserController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Busca al usuario en la base de datos
  const user = await getUser(email, password);
  
  console.log(user);
});

export default UserController;
