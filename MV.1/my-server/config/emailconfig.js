const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crisca807@gmail.com', // tu correo de Gmail
    pass: 'aihw ontj qary qixj' // tu contraseña de Gmail o contraseña de aplicación
  }
});

const enviarCorreoReserva = (reserva) => {
  let mailOptions = {
    from: 'mixato86@gmail.com',
    to: 'mixato86@gmail.com',
    subject: 'Confirmación de su reserva',
    text: `Bienvenido, su reserva ha sido confirmada con los siguientes detalles:
    - ID Cliente: ${reserva.id_cliente}
    - Matrícula del Vehículo: ${reserva.matricula_vehiculo}
    - Nombre del Parking: ${reserva.nombre_parking}
    - Fecha de Inicio: ${reserva.fecha_inicio}
    - Fecha de Fin: ${reserva.fecha_fin}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error al enviar correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = { enviarCorreoReserva };
