const express =  require('express');
const route = express.Router();
const mysqlConnection = require('../db'); 



route.post('/api/guardarProductos', (req, res) => {
    const nombre = req.body.Nombre;
    const nombrePro = req.body.Producto;
    const idCate = req.body.Categoria;
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                mysqlConnection.query(`INSERT INTO categoria(idcategoria,nombre) values (${idCate},"${nombrePro}");`, (error, rows) => {
                    if (!error) {
                        res.json({
                            Producto: "Producto Agregado"
                        })
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


route.put('editCategoria/:id',(req, res) => {

    const nombre = req.body.Nombre;
    const nombrePro = req.body.Producto;
    const idCate = req.body.Categoria;
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                mysqlConnection.query(`UPDATE categoria SET nombre = "${nombrePro}"  WHERE idcategoria = ${idCate} ;`,(error, rows) => {
                    if (!error) {
                        res.json({
                            Producto: "Producto editado"
                        })
                    } else {
                        res.json({
                            Error: "No se pudo editar el producto"
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

route.get('/obtenerCategorias',(req, res) => {
    const  nombre = req.body.Nombre;
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                mysqlConnection.query('SELECT * FROM categoria', (error, rows) => {
                    if (!error) {
                        res.json({categoria: "Categorias encontradas"});
                        res.json(rows);
                        
                    } else {
                        res.json({
                            Error: "No se encontraron categorias"
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


  route.get('/obtenerCategoriasId/:id',(req, res) => {
    const nombre = req.body.Nombre;
    const idcat = req.body.idCategoria 
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                mysqlConnection.query(`SELECT * FROM categoria WHERE idcategoria = ${idcat} ;`,(error,rows) => {
                    if (!error) {
                        res.json({categoria: "Categoria encontrada"});
                        res.json(rows);
                        
                    } else {
                        res.json({
                            Error: "No se encontro la categoria"
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


 route.delete('/deleteCategoria/:id', (reques, response) => {

    const nombre = req.body.Nombre;
    const idcat = req.body.idCategoria 
    let ad = "";
    mysqlConnection.query("SELECT tipo FROM usuarios WHERE Nombre= '" + nombre + "'", (error, row) => {
        if (!error) {
            ad=row;
            if (ad.tipo === "adimin") {
                mysqlConnection.query(`UPDATE categoria SET Activo = false WHERE idcategoria = ${idcat};`, (error, rows) => {
                    if (!error) {
                        res.json({categoria: "Categoria eliminada"});
                        res.json(rows);
                        
                    } else {
                        res.json({
                            Error: "no se pudo eliminar la categodia "
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






module.exports = route;