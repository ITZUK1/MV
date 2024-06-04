const express = require('express');
const router = express.Router();
const db = require('../config/db');
const ensureCityExists = require('../helpers/ensureCityExists');

router.post('/', (req, res) => {
    let { dni, nombre, primer_apellido, segundo_apellido, calle, numero, id_ciudad, telefono } = req.body;

    primer_apellido = primer_apellido || '';

    ensureCityExists(id_ciudad, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        const sql = 'INSERT INTO Cliente (dni, nombre, primer_apellido, segundo_apellido, calle, numero, id_ciudad, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [dni, nombre, primer_apellido, segundo_apellido, calle, numero, id_ciudad, telefono], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Datos guardados correctamente');
        });
    });
});

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Cliente';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Cliente WHERE id_cliente = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(result[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    let { dni, nombre, primer_apellido, segundo_apellido, calle, numero, id_ciudad, telefono } = req.body;

    primer_apellido = primer_apellido || '';

    ensureCityExists(id_ciudad, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        const sql = 'UPDATE Cliente SET dni = ?, nombre = ?, primer_apellido = ?, segundo_apellido = ?, calle = ?, numero = ?, id_ciudad = ?, telefono = ? WHERE id_cliente = ?';
        db.query(sql, [dni, nombre, primer_apellido, segundo_apellido, calle, numero, id_ciudad, telefono, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Cliente no encontrado');
            }
            res.send('Cliente actualizado correctamente');
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Cliente WHERE id_cliente = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.send('Cliente eliminado correctamente');
    });
});

module.exports = router;
