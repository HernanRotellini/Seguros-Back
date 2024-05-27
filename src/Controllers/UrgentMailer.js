
const path = require('path');

const nodemailer = require('nodemailer');


// Configura el transportador de Nodemailer
const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'oesteseguros123@gmail.com',
        pass: 'bgjjoqcrrhtrqhgg'
    },
    tls: {
        rejectUnauthorized: false // Configura esto para aceptar certificados autofirmados
    }
};

const transporter = nodemailer.createTransport(config);


const UrgentMail = async (subjectText, message, name, contactmail, bool, imageFilePaths) => {
  console.log("Enviando correo");
  let address;
  if (bool) {
      address = "oesteseguros123@gmail.com";
  } else {
      address = "hernanrotellini@hotmail.com";
  }
  let mailOptions = {
      from: "oesteseguros123@gmail.com",
      to: address,
      subject: subjectText,
      html: `<h5>Mensaje enviado desde la página web</h5>
              <h5>${message.replace(/\n/g, '<br>')}<br>Datos de contacto:<br>Nombre: ${name}<br>Email: ${contactmail}</h5>`,
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
