const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectMongoAtlas() {
  try {
    await client.connect();
    const database = await client.db("listaDeTareas");
    const collectionTareas = await database.collection("tareas");
    const collectionUsers = await database.collection("users");
    console.log("conectando correctamente a base de datos en mongoDB atlas");
    return { collectionTareas, collectionUsers };
  } catch (error) {
    console.log(error);
  }
}

async function readCollection(collection) {
  try {
    const database = await collection.find({}).toArray();
    console.log(`base de datos lista de tareas ${JSON.stringify(database)}`);
    return database;
  } catch (error) {
    console.log(error);
  }
}

async function crearDocumento(collection, nuevo) {
  try {
    const result = await collection.insertOne(nuevo);
    console.log(`nuevo documento agregado con el id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  }
}

async function borrar(collection, filter) {
  try {
    const result = await collection.deleteOne(filter);
    if (result.deletedCount === 1) {
      console.log(`Tarea eliminada: ${result.deletedCount}`);
    } else {
      console.log("la tarea no pudo ser eliminada");
    }
  } catch (error) {
    console.error(error);
  }
}

async function actualizar(collection, filter, nuevosDatos) {
  try {
    const updateDoc = {
      $set: nuevosDatos,
    };
    const result = await collection.updateOne(filter, updateDoc);
    console.log(`Tarea actualizada: ${result.modifiedCount}`);
  } catch (error) {
    console.error(error);
  }
}

async function buscar(collection, filterId) {
  try {
    const tarea = await collection.findOne(filterId);
    if (tarea) {
      console.log(`tarea encontrada: ${JSON.stringify(tarea)}`);
      return tarea;
    } else {
      console.log("tarea no encontrada");
    }
  } catch (error) {
    console.error(error);
  }
}

connectMongoAtlas();

//exportando las funciones asincronas para poder usarlas en las diferentes rutas, 
//y poder hacer los metodos CRUD, en la base de datos de mongodb Atlas  
//para coleccion de usuarios
//y la coleccion de tareas

module.exports = {
  connectMongoAtlas,
  readCollection,
  crearDocumento,
  borrar,
  actualizar,
  buscar,
};
