import { sign } from "jsonwebtoken";
import db from "../config/db";

import bcrypt from "bcrypt";

export const registerUser = async (user: any) => {
  try {
    const hash = await bcrypt.hash(user.contraseña, 10);

    const results = await db.promise().query(
      `INSERT INTO usuarios (email, contraseña, descripcion, foto, nombre ) 
        VALUES ('${user.email}', '${hash}', '${user.descripcion}', '${user.foto}', '${user.nombre}')`
    );

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (email, password): Promise<string> => {
  let token;
  const results = await db
    .promise()
    .query(`SELECT * FROM usuarios WHERE email = '${email}'`);

  const user = results[0];

  console.log(results);

  if (!user) {
    console.log("No se encontro el usuario");
    return null;
  }

  // Compara la contraseña ingresada con el hash almacenado
  bcrypt.compare(password, user.contraseña, (err, resultado) => {
    if (err || !resultado) {
      console.log(err, resultado);
      return null;
    }

    // Genera un token JWT para el usuario autenticado
    const getToken = sign({ user: user }, "clavesupersegura123", {
      expiresIn: "2h",
    });

    token = getToken;

    return token;
  });
};
