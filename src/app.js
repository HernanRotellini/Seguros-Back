const express = require("express");
require("./db.js");
const router = require("./Routes/routes.js");
const server = express();
const bodyParser = require("body-parser");
const UrgentMail = require("./Controllers/UrgentMailer");
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');


server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", router);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });


server.post('/UrgentMailer', upload.array('images[]', 10), async (req, res) => {
  const { subjectText, message, name, contactmail, bool } = req.body;
  const imageFilesPaths = req.files.map(file => file.path); // Rutas de los archivos cargados

  try {
      const result = await UrgentMail(subjectText, message, name, contactmail, bool, imageFilesPaths);
      res.status(200).json({ message: result });
  } catch (error) {
      res.status(500).json({ message: error });
  } finally {
      // Limpia los archivos cargados del servidor
      imageFilesPaths.forEach(imageFilePath => {
          fs.unlink(imageFilePath, (err) => {
              if (err) console.error("Error al eliminar el archivo cargado:", err);
          });
      });
  }
});
module.exports = server;
