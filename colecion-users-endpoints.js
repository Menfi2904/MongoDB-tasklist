const express = require("express");
const routerUsers = express();
const funcionesCRUD = require("./db-controles");
const { ObjectId } = require("mongodb");
const middleware = require("./middlewares")

//leer la coleccion users de la base de datos listaDeTareas
routerUsers.get("/", middleware.validateToken, async (req, res) => {
  try {
    const { collectionUsers } = await funcionesCRUD.connectMongoAtlas();
    const baseDeDatos = await funcionesCRUD.readCollection(collectionUsers);
    res.status(200).json(baseDeDatos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "No se pudo acceder a la base de datos" });
  }
})
.post("/crearusuario", middleware.manejarErroresUsuarios, async (req, res) => {       //crear un nuevo usuario
  try {
    const { collectionUsers } = await funcionesCRUD.connectMongoAtlas();
    const nuevoUser = req.body;
    await funcionesCRUD.crearDocumento(collectionUsers, nuevoUser);
    res
      .status(201)
      .json({ message: "usuario creado exitosamente", data: nuevoUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "el usuario no pudo ser creado" });
  }
})
.delete("/borrarusuario/:id", async (req, res) => {                               //Borrar usuario por id
    try {
      const { collectionUsers } = await funcionesCRUD.connectMongoAtlas();
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      await funcionesCRUD.borrar(collectionUsers, filter);
      res.status(200).json({ message: "usuario borrado" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo borrar al usuario" });
    }
  })
  .put("/actualizarusuario/:id", middleware.manejarErroresUsuarios, async (req, res) => {   //actualizar usuario por id
    try {
      const { collectionUsers } = await funcionesCRUD.connectMongoAtlas();
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const usuarioActualizado = req.body;
      await funcionesCRUD.actualizar(collectionUsers, filter, usuarioActualizado);
      res
        .status(200)
        .json({ message: "usuario actualizado", usuarioActualizado });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar el usuario" });
    }
  })
  .get("/buscarusuario/:id", async (req, res) => {               //Buscar usuario por ID
    try {
      const { collectionUsers } = await funcionesCRUD.connectMongoAtlas();
      const id = req.params.id;
      const filterId = { _id: new ObjectId(id) };
      const usuarioEncontrado = await funcionesCRUD.buscar(
        collectionUsers,
        filterId
      );
      if (usuarioEncontrado) {
        res.status(200).json({ message: "usuario encontrado", usuarioEncontrado });
      } else {
        res.status(404).json({ error: "usuario no encontrado" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo acceder a la base de datos usuarios" });
    }
  });
  

module.exports = routerUsers;
