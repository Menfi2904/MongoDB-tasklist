documento de google docs con las capturas de MONGODB
https://docs.google.com/document/d/16Eq2MFgzE9nZrHUUqoiYLpj1e7_2KSyLJgQcdM9zY0k/edit?usp=sharing


#¿Qué es mi producto y para que sirve?
Es una API diseñada para interactuar con una base de datos alojada en un cluster de MongoDB Atlas, 
que contiene dos colecciones: "tareas" y "users". Esta API ofrece funcionalidades que permiten 
a los usuarios realizar operaciones de Crear, Leer, Actualizar y Borrar (CRUD) en estos datos 
almacenados en la base de datos. Los usuarios podrán acceder a esta base de datos desde cualquier 
lugar siempre que tengan la autorización adecuada.


#¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?
Operaciones CRUD Eficientes: Esta API proporciona rutas y endpoints eficientes para realizar 
operaciones CRUD en las colecciones de tareas y usuarios. Esto simplifica la gestión de datos 
y garantiza una buena experiencia para el usuario.

Seguridad con JWT: La implementación de JSON Web Tokens (JWT) es un componente muy importante en esta API. 
Los usuarios deben autenticarse y poseer un token válido para acceder 
a la información de la base de datos. Esto fortalece la seguridad y asegura que 
solo las personas autorizadas puedan interactuar con los documentos.

Los usuarios se beneficiarán de estas funcionalidades de la API porque les permite gestionar 
eficazmente sus datos almacenados en MongoDB Atlas desde cualquier lugar con acceso autorizado. 
La facilidad de uso y la seguridad incorporada hacen que esta API sea una herramienta valiosa para 
aquellos que desean gestionar y acceder a datos de manera eficiente y segura.