const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usuarios = require("./db-controles");

app.post("/loginmongoatlas", async (req, res) => {
  try {
    const { collectionUsers } = await usuarios.connectMongoAtlas();
    const { nombre, password } = req.body;
    const usuarioEncontrado = await collectionUsers.findOne({
      nombre: nombre,
      password: password,
    });
    if (usuarioEncontrado) {
      const user = {
        nombre: usuarioEncontrado.nombre,
        password: usuarioEncontrado.password,
      };
      const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });
      res
        .header("authorization", accessToken)
        .json({ message: "usuario autenticado", token: accessToken });
    } else {
      res.json("usuario y contraseña no validos");
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "no se pudo generar el acceso a la base de datos" });
  }
});

module.exports = app;
