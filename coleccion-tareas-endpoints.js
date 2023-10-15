const express = require("express");
const routerTareas = express.Router();
const funcionesCRUD = require("./db-controles");
const { ObjectId } = require("mongodb");
const middleware = require("./middlewares")

//leer la coleccion tareas de la base de datos listaDeTareas
routerTareas.get("/", middleware.validateToken, async (req, res) => {
  try {
    const { collectionTareas } = await funcionesCRUD.connectMongoAtlas();
    const baseDeDatos = await funcionesCRUD.readCollection(collectionTareas);
    res.status(200).json(baseDeDatos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "No se pudo acceder a la base de datos" });
  }
})
.post("/creartarea", middleware.manejarErroresTareas, async (req, res) => {       //crear una nueva tarea
  try {
    const { collectionTareas } = await funcionesCRUD.connectMongoAtlas();
    const nuevaTarea = req.body;
    await funcionesCRUD.crearDocumento(collectionTareas, nuevaTarea);
    res
      .status(201)
      .json({ message: "Tarea creada exitosamente", data: nuevaTarea });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "la tarea no pudo ser creada" });
  }
})
.delete("/borrartarea/:id", async (req, res) => {                             //Borrar tarea por id
  try {
    const { collectionTareas } = await funcionesCRUD.connectMongoAtlas();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    await funcionesCRUD.borrar(collectionTareas, filter);
    res.status(200).json({ message: "tarea borrada" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "No se pudo encontrar la tarea" });
  }
})
.put("/actualizartarea/:id", middleware.manejarErroresTareas, async (req, res) => {                              //actualizar tarea por id
  try {
    const { collectionTareas } = await funcionesCRUD.connectMongoAtlas();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const tareaActualiza = req.body;
    await funcionesCRUD.actualizar(collectionTareas, filter, tareaActualiza);
    res
      .status(200)
      .json({ message: "Tarea actualizada", message: tareaActualiza });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "No se pudo actualizar la tarea" });
  }
})
.get("/buscartarea/:id", async (req, res) => {                                  //buscar tarea por ID
  try {
    const { collectionTareas } = await funcionesCRUD.connectMongoAtlas();
    const id = req.params.id;
    const filterId = { _id: new ObjectId(id) };
    const tareaEncontrada = await funcionesCRUD.buscar(
      collectionTareas,
      filterId
    );
    if (tareaEncontrada) {
      res.status(200).json({ message: "tarea encontrada", tareaEncontrada });
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "No se pudo encontrar la tarea" });
  }
});


module.exports = routerTareas;
