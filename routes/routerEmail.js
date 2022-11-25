const express = require("express");
const Router = express.Router();
const controllerEmail = require("../constrollers/controllerSendEmail")


Router.post("/send", controllerEmail.enviarEmail);

module.exports = Router;