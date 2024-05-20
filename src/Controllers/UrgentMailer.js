const nodemailer = require("nodemailer");
const tls = require("tls");

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

const UrgentMail = async (subjectText, description, name, contactmail) => {
  console.log("Enviando correo");

  let mail = {
    from: "oesteseguros123@gmail.com",
    to: "oesteseguros123@gmail.com",
    subject: subjectText,
    html: `<h5>Mensaje enviado desde la página web</h5>
          <h5>${description.replace(/\n/g, '<br>')}<br>Datos de contacto:<br>Nombre: ${name}<br>Email: ${contactmail}</h5>`
  };
  

  return new Promise((resolve, reject) => {
    transporter.sendMail(mail, (error, info) => {
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
//Json de prueba en postman

/*
{
  "subjectText": "Urgent Mail from Your Website",
  "description": "This is an urgent message from your website. Please review the details below.",
  "name": "John Doe",
  "contactmail": "john.doe@example.com" 
}
*/

//URL para probarlo http://localhost:3001/UrgentMailer
module.exports = UrgentMail;
