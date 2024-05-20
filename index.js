require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
//const { conn } = require("./src/db.js");


  server.listen(port, () => {
    console.log("Server funcionando puerto " + port);
  });
