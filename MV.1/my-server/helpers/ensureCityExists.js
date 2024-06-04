const db = require('../config/db');

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

module.exports = ensureCityExists;
