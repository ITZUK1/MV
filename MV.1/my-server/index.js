const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const ClienteRoutes = require('./routes/ClienteRoutes');
const AgenciaRoutes = require('./routes/AgenciaRoutes');
const ReservaRoutes = require('./routes/ReservaRoutes');
const LoginRoutes = require('./routes/LoginRoutes');



const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/Cliente', ClienteRoutes);
app.use('/Agencia', AgenciaRoutes);
app.use('/Reserva', ReservaRoutes);
app.use('/Login', LoginRoutes);



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
