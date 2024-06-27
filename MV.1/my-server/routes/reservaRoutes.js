const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { enviarCorreoReserva } = require('../config/emailconfig'); // Importa la función de envío de correos

// CREATE - Agregar una nueva reserva
router.post('/', (req, res) => {
    const { id_cliente, matricula_vehiculo, nombre_parking, fecha_inicio, fecha_fin } = req.body;

    const sql = 'INSERT INTO Reserva (id_cliente, matricula_vehiculo, nombre_parking, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [id_cliente, matricula_vehiculo, nombre_parking, fecha_inicio, fecha_fin], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        const nuevaReserva = { id_cliente, matricula_vehiculo, nombre_parking, fecha_inicio, fecha_fin };
        enviarCorreoReserva(nuevaReserva); // Envía el correo

        res.send('Reserva creada correctamente');
    });
});

// READ - Obtener todas las reservas
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Reserva';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// READ - Obtener una reserva por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Reserva WHERE id_reserva = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('Reserva no encontrada');
        }
        res.json(result[0]);
    });
});

// UPDATE - Actualizar una reserva por su ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_cliente, matricula_vehiculo, nombre_parking, fecha_inicio, fecha_fin } = req.body;

    const sql = 'UPDATE Reserva SET id_cliente = ?, matricula_vehiculo = ?, nombre_parking = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_reserva = ?';
    db.query(sql, [id_cliente, matricula_vehiculo, nombre_parking, fecha_inicio, fecha_fin, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Reserva no encontrada');
        }
        res.send('Reserva actualizada correctamente');
    });
});

// DELETE - Eliminar una reserva por su ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Reserva WHERE id_reserva = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Reserva no encontrada');
        }
        res.send('Reserva eliminada correctamente');
    });
});

module.exports = router;
