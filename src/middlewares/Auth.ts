const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  // Obtiene el token de la solicitud de la cabecera
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  // Verifica el token
  jwt.verify(token.split(" ")[1], "test123", (err, user) => {
    if (err) {
      console.log(err);

      return res.status(403).json({ error: "Token inválido" });
    }
    req.body.user = user; // Agrega los datos del usuario al objeto de solicitud para su uso posterior
    next();
  });
}

export default checkToken;
