import express from 'express';
const router = express.Router();
const database = require('../connection');

// Regresa todas las salas de cine
router.get('/get-compras', async(req, res) => {
    try {
        const salas = await database.query('SELECT * FROM compras')
        res.json(salas)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

module.exports = router;