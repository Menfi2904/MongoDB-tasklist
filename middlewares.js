const jwt = require("jsonwebtoken");
require("dotenv").config();


// middleware para validar el token, y dar acceso a las rutas
function validateToken(req, res, next) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.send("token no valido");
  }
  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.send("acceso denegado o token no valido");
    } else {
      next();
    }
  });
}

//middleware para validar que el metodo HTTP incluye uno de los que estamos usando
const metodosHTTPermitidos = (req, res, next)=>{
    const metodosHTTP = ['GET' , 'POST', 'PUT', 'DELETE']
    if (metodosHTTP.includes(req.method)){
    next()
    }else{
      res.status(400).json({error: 'Metodo HTTP no permitido'})
    }
    }
  
//Middleware que maneja errores retornando un código de respuesta 400:
//Solicitudes POST y PUT con el cuerpo vacio
//Solicitudes POST y PUT que tengan información no valida
function manejarErroresTareas(req, res, next) {
    if (req.method === "POST" || req.method === "PUT") {
      if (!req.body || Object.keys(req.body).length === 0) {
         res.status(400).json({errorMessage: "el cuerpo no puede estar vacio, intenta nuevamente"});
      }
    }
    if (req.method === "POST" && (!req.body.titulo || !req.body.descripcion)) {
      res.status(400).json({errorMessage:"para crear una tarea debes agregar un titulo y una descripcion"});
    }
    if (req.method === "PUT" && (!req.body.descripcion || !req.body.estado)) {
     res.status(400).json({ errorMessage:"Debes agregar una descripcion y un estado de completada: true/false validos"});
    }
    next();
  }


function manejarErroresUsuarios (req, res, next){
    if (req.method === "POST" || req.method === "PUT"){
        if(!req.body || Object.keys(req.body).length === 0){
            res.status(400).json({message: "la informacion de usuario no puede estar vacio"})
        }
    }
    if(req.method === "POST" && (!req.body.nombre || !req.body.password)){
        res.status(400).json({message: "nombre y password de usuario son requeridos"})
    }
    if(req.method === "PUT" && (!req.body.password || !req.body.rol)){
        res.status(400).json({message: "password y rol son requeridos par actualizar la informacion de usuario"})
    }
    next()
}

  module.exports={validateToken, metodosHTTPermitidos, manejarErroresTareas, manejarErroresUsuarios}