import { Router } from "express";
import db from "../config/db";
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRouter = Router();

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user;
  // Busca al usuario en la base de datos
  db.query(
    `SELECT * FROM usuarios WHERE email = 'lautaro@test.com'`,
    (err: any, results: any, fields: any) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        return;
      }
      const user = results[0];

      if (!user) {
        console.log("NO USER");

        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      // Compara la contraseña ingresada con el hash almacenado
      bcrypt.compare(password, user.contraseña, (err, resultado) => {
        if (err || !resultado) {
          console.log(err, resultado);

          return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Genera un token JWT para el usuario autenticado
        const token = jwt.sign({ user: user }, "test123", {
          expiresIn: "1h",
        });

        // Envia el token como respuesta
        res.status(200).json({ token });
      });
    }
  );
});

usersRouter.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err: any, results: any, fields: any) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      return;
    }
    res.json({ users: results });
  });
});

usersRouter.post("/register", (req, res) => {
  const { email, password, descripcion, foto, nombre } = req.body;

  // Verifica si el usuario ya existe en la base de datos

  // Genera un hash de la contraseña antes de almacenarla en la base de datos
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Error al registrar el usuario" });
    }

    // Almacena el usuario en la base de datos
    db.query(
      `INSERT INTO usuarios (email, contraseña, descripcion, foto, nombre) values ('${email}', '${hash}', '${descripcion}', '${foto}', '${nombre}')`,
      (err: any, results: any, fields: any) => {
        if (err) {
          console.error("Error al realizar la consulta:", err);
          return;
        }
        res.json({ users: results });
      }
    );

    // Crea un token JWT para el nuevo usuario
    const token = jwt.sign(
      {
        user: {
          email,
          password,
          descripcion,
          foto,
          nombre,
        },
      },
      "tu_secreto",
      { expiresIn: "1h" }
    );

    // Envia el token como respuesta
    res.status(201).json({ token });
  });
});

//export default usersRouter;
