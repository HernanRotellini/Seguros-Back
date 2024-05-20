const express = require("express");
require("./db.js");
const router = require("./Routes/routes.js");
const server = express();
const bodyParser = require("body-parser");
const UrgentMail = require("./Controllers/UrgentMailer");


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

server.post("/UrgentMailer", (req, res) => {
  const { subjectText, description, name, contactmail } = req.body;
  
  UrgentMail(subjectText, description, name, contactmail)
    .then((response) => {
      res.status(200).json({ message: response });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
module.exports = server;
