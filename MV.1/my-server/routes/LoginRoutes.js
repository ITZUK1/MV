const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    
    console.log('Datos recibidos para el inicio de sesión:', { username, password });

    const sql = 'SELECT * FROM Cliente WHERE nombre = ? AND contraseña = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error en la consulta de base de datos:', err);
            return res.status(500).send('Error en la consulta de base de datos');
        }
        if (result.length === 0) {
            console.log('Credenciales incorrectas');
            return res.status(401).send('Credenciales incorrectas');
        }
        res.json({ message: 'Inicio de sesión exitoso', cliente: result[0] });
    });
});

module.exports = router;
