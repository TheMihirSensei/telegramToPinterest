const { Router } = require("express");
const router = Router();

const telegramRoute = require("./telegram.routes");

router.use("/telegram", telegramRoute);

module.exports = router;
