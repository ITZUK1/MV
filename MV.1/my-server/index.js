const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const clienteRoutes = require('./routes/clienteRoutes');
const agenciaRoutes = require('./routes/agenciaRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/cliente', clienteRoutes);
app.use('/agencia', agenciaRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
