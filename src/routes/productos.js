const express =  require('express');
const route = express.Router();
const mysqlConnection = require('../db'); 

route.post('/addProducto', (req, res) => {

    const nombre = req.body.Nombre; 
    const nombrePro = req.body.Producto;
    const idCate = req.body.Categoria;
    const nombresUsu = req.body.NombreUsu;
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombresUsu + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "cliente") {
                mysqlConnection.query(`INSERT INTO producto(idproducto,nombre,cantidad,precio) values (${idproducto},"${nombre}","${cantidad}","${precio}");`, (error, rows) => {
                    if (!error) {
                        res.json({producto: "Enviado"});
                        res.json(rows);
                        
                    } else {
                        res.json({
                            Error: "No se pudo agregar al producto"
                        })
                    }
                })
            } else {
                res.json({
                    Error: "Permiso denegado "
                })
            }
        } else {
            res.json(error)
        }
    });
});

route.put('/editProducto/:id', (reques, response) => {

    const nombre =  reques.body.nombre;
    const cantidad =  reques.body.cantidad;
    const id = reques.params.id;
    let = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {

        if (!error) {
            ad=row;
            if (ad.tipo === "cliente") {
                mysqlConnection.query(`UPDATE producto SET nombre = "${nombre}" , cantidad = "${cantidad}", precio = "${precio}" WHERE idproducto = ${id} ;`,(error, rows) => {
                    if(!error){
                        response.json(rows);
                    }else{
                        console.log(error);
                    }
                });
            }else{
                response.json({Error: "Permiso denagado"})
            }
        }else{
            response.json(error)
        }
    });
})


route.get('/obtenerProductos',(req, res) => {
    const  nombre = req.body.Nombre;
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                    mysqlConnection.query('SELECT * FROM producto', (error, rows)=> {
                        if(!error){
                            response.json({producto: "Productos encontrados"});
                            response.json(rows);
                        }else{
                           console.log(e);
                        }
                     });

            } else {
                res.json({
                    Error: "Permiso denegado "
                })
            }
        } else {
            res.json(error)
        }
    });
});


  route.get('/obtenerProductoId/:id',(req, res) => {
    const nombre = req.body.Nombre;
    const idcat = req.body.idCategoria 
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                    const id = request.params.id;
                    mysqlConnection.query(`SELECT * FROM producto WHERE idproducto = ${id} ;`,(error,rows)=>{
                       if(!error){
                          respuesta.json({producto: "Producto encontrado"});
                          respuesta.json(rows);
                       }else{
                          console.log(error);
                       }
                    });
                 
            } else {
                res.json({
                    Error: "Permiso denegado "
                })
            }
        } else {
            res.json(error)
        }
    });
});


 route.delete('/deleteProducto/:id', (reques, response) => {

    const nombre = req.body.Nombre;
    const idcat = req.body.idCategoria 
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                
                    const id = reques.params.id;
                    mysqlConnection.query(`UPDATE producto SET Activo = false WHERE idproducto = ${id};`, (error, rows) => {
                
                        if (!error) {
                            response.json({
                                producto: "Eliminado"
                                }
                
                            );
                        } else {
                            console.log(error);
                        }
                    });
                
                
            } else {
                res.json({
                    Error: "Permiso denegado "
                })
            }
        } else {
            res.json(error)
        }
    });
});






module.exports = route;