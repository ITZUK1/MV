const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'motocompeticion'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Verificar si la ciudad existe, si no, insertarla
const ensureCityExists = (id_ciudad, callback) => {
    const checkCitySql = 'SELECT * FROM Ciudad WHERE id_ciudad = ?';
    db.query(checkCitySql, [id_ciudad], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length === 0) {
            const insertCitySql = 'INSERT INTO Ciudad (nombre, codigo_postal, provincia, num_habitantes) VALUES (?, ?, ?, ?)';
            db.query(insertCitySql, ['Ciudad Ejemplo', '12345', 'Provincia Ejemplo', 100000], (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        } else {
            callback(null);
        }
    });
};

// Ruta para crear un nuevo cliente
app.post('/cliente', (req, res) => {
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

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM Cliente';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para obtener un cliente por id_cliente
app.get('/cliente/:id', (req, res) => {
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

// Ruta para actualizar un cliente
app.put('/cliente/:id', (req, res) => {
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

// Ruta para eliminar un cliente
app.delete('/cliente/:id', (req, res) => {
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







///////////////////////////////////////////AGENCIA///////////////////////////////////////
// Ruta para crear una nueva agencia
app.post('/agencia', (req, res) => {
    const { nombre, calle, numero, poblacion } = req.body;

    const sql = 'INSERT INTO Agencia (nombre, calle, numero, poblacion) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, calle, numero, poblacion], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Datos de la agencia guardados correctamente');
    });
});

// Ruta para obtener todas las agencias
app.get('/agencias', (req, res) => {
    const sql = 'SELECT * FROM Agencia';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para obtener una agencia por su id
app.get('/agencia/:id', (req, res) => {
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

// Ruta para actualizar una agencia
app.put('/agencia/:id', (req, res) => {
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

// Ruta para eliminar una agencia
app.delete('/agencia/:id', (req, res) => {
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






app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
