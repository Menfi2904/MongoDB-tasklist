const express = require("express");
const app = express();
const port = 4000;
app.use(express.json());

const routerTareas = require("./coleccion-tareas-endpoints");
const routerUsers = require("./colecion-users-endpoints");
const routerJWT = require("./generateJWT");
const middleware = require("./middlewares");

app.use(middleware.metodosHTTPermitidos);

app.use("/tareas", routerTareas);
app.use("/usuarios", routerUsers);
app.use("/useraccess", routerJWT);

app.get("/", (req, res) => {
  res.send("Base de datos: lista de tareas con MongoDB atlas");
});

app.listen(port, () => {
  console.log("servidor iniciando en el puerto... ", port);
});
