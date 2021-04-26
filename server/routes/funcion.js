import express from 'express';
const router = express.Router();
const database = require('../connection');

// Regresa todas las salas de cine
router.get('/get-funciones', async(req, res) => {
    try {
        const query = `
            SELECT f.id as id, f.id_sala as id_sala, f.fecha_hora as fecha_hora, f.precio as precio, p.nombre nombre, p.descr as descr, p.imagen as imagen
            FROM pelicula p, funcion f
            WHERE f.id_pelicula = p.id
        `
        const funciones = await database.query(query)
        res.json(funciones)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

router.post('/agregar-funcion', async(req, res) => {
    try{
        let { id_pelicula, id_sala, fecha_hora, precio } = req.body;

        const funcion = await database.query(`INSERT INTO funcion (id_pelicula, id_sala, fecha_hora, precio ) VALUES (${id_pelicula}, ${id_sala}, '${fecha_hora}', ${precio})`);

        const funcion_id = funcion.insertId
        const sala = await database.query(`SELECT * from sala WHERE id = ${id_sala}`)

        for(let i = 0; i < sala[0].n_filas; i++){
            for(let j = 0; j < sala[0].n_asientos; j++){
                if(j < 9){
                    await database.query(`INSERT INTO asiento VALUES ('${i+1}-0${j+1}', ${funcion_id}, ${0})`)
                } else {
                    await database.query(`INSERT INTO asiento VALUES ('${i+1}-${j+1}', ${funcion_id}, ${0})`)
                }
            }
        }

        res.json({
            mensaje: 'PRODUCT_ADDED'
        });
    }
    catch (error){
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
})
module.exports = router;