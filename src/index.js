const express = require('express');
//utilizar la funcion
const app = express(); 

//Configuar servidor
app.set('port', process.env.PORT || 4500);//agregar un poerto

//Middlewares
//en casode tener un json que lo acepte
app.use(express.json());
//Rutas
app.use(require('./routes/productos'));
app.use(require('./routes/categoria'));
app.use(require('./routes/usuarios'));

//Prueba de configuracion
app.listen(app.get('port'),()=>{
 console.log("Corriendo el servidor: ", app.get('port'));
});  