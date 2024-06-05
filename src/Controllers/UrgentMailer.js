
const path = require('path');
require("dotenv").config();
const nodemailer = require('nodemailer');


// Configura el transportador de Nodemailer
const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }
};

const transporter = nodemailer.createTransport(config);


const UrgentMail = async (subject, message, name, email, bool, imageFilePaths) => {
  console.log("Enviando correo");
  let address;
      address = process.env.EMAIL_ADDRESS;

      if(bool){
        subject = "ATE " + subject
      }
  let mailOptions = {
      from: process.env.EMAIL_USER,
      to: address,
      subject: subject,
      html: `<h3>${message.replace(/\n/g, '<br>')}</h3>
              <h3>Datos de contacto:<br>Nombre: ${name}</h3>
              <h3>Email: ${email}</h3>`,
      attachments: imageFilePaths.map(imageFilePath => ({
          filename: path.basename(imageFilePath),
          path: imageFilePath
      }))
  };

  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error("Error al enviar el correo:", error);
              reject("Error al enviar el correo");
          } else {
              console.log("Correo enviado correctamente");
              resolve("Correo enviado exitosamente");
          }
      });
  });
};


module.exports = UrgentMail;
