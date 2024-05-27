require("dotenv").config();
const server = require("./src/app.js");

server.listen(0, function()  {
  port = this.address().port;
  console.log(`Server funcionando en puerto ${port}`);
});
