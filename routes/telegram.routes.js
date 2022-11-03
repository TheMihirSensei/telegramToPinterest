const { Router } = require("express");
const { getContentOfTelegramGroup } = require("../controllers");
const telegramRoute = Router();

getContentOfTelegramGroup;
telegramRoute.get("/group-content/:group_name", getContentOfTelegramGroup);

module.exports = telegramRoute;
