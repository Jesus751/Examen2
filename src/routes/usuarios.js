const express =  require('express');
const route = express.Router();
const mysqlConnection = require('../db');

route.post('/addUsuario', (reques,response) => {
    const {idUsuario,nombre,apellido,telefono,tipo} = reques.body;
    mysqlConnection.query(`INSERT INTO usuario(idusuario,nombre,apellido,telefono,tipo) values (${idUsuario},"${nombre}","${apellido},"${telefono}","${tipo}");`, (error, rows) =>{
        if(!error){
            response.json({usuario: "Usuario guardado"});
            response.json(rows);
        }else{
            console.log(error);
        }
    });
});

route.put('/editUsuario/:id',(reques,response) => {

    const {nombre,apellido,telefono,tipo}  = reques.body;
    const id = reques.params.id

    mysqlConnection.query(`UPDATE usuario SET nombre = "${nombre}",apellido = "${apellido}",telefono = "${telefono}",tipo = "${tipo}"  WHERE idusuario = ${id} ;`,(error, rows) => {
        if(!error){
            response.json(rows);
            response.json({
                usuario:"Usuario actualizado"
            })
        }else{
            console.log(error);
        }
    });
});

route.get('/obtenerUsuarios',(reques,response)=>{
    mysqlConnection.query('SELECT * FROM usuario', (error, rows)=> {
        if(!error){
            response.json({usuario: "Usuarios encontrados"});
            response.json(rows);
        }else{
           console.log(e);
        }
     });
  });

  route.get('/obtenerUsuarioId/:id',(reques, response)=>{

    const id = reques.params.id;
    mysqlConnection.query(`SELECT * FROM usuario WHERE idusuario = ${id} ;`,(error,rows)=>{
       if(!error){
          response.json({usuario: "usuario encontrado"});
          response.json(rows);
       }else{
          console.log(error);
       }
    });
 });

 route.delete('',(reques, response) => {

    const id = reques.params.id;
    mysqlConnection.query(`UPDATE usuario SET Activo = false WHERE idusuario = ${id};`, (error, rows) => {

        if (!error) {
            response.json({
                usuario: "Usuario Eliminado"
                }

            );
        } else {
            console.log(error);
        }
    });
});




module.exports = route;