const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
    const { nombre, calle, numero, poblacion } = req.body;

    const sql = 'INSERT INTO Agencia (nombre, calle, numero, poblacion) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, calle, numero, poblacion], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Datos de la agencia guardados correctamente');
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Agencia';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Agencia WHERE id_agencia = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Agencia no encontrada');
        }
        res.json(result[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, calle, numero, poblacion } = req.body;

    const sql = 'UPDATE Agencia SET nombre = ?, calle = ?, numero = ?, poblacion = ? WHERE id_agencia = ?';
    db.query(sql, [nombre, calle, numero, poblacion, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Agencia no encontrada');
        }
        res.send('Agencia actualizada correctamente');
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Agencia WHERE id_agencia = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Agencia no encontrada');
        }
        res.send('Agencia eliminada correctamente');
    });
});

module.exports = router;
