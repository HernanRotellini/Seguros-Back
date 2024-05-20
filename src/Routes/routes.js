const { Router } = require("express");
const router = Router();
const UrgentMail = require("../Controllers/UrgentMailer");
//usar las rutas desde app.js
router.post("/UrgentMailer", UrgentMail);

module.exports = router;