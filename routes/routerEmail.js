const express = require("express");
const Router = express.Router();
const controllerEmail = require("../constrollers/controllersSendEmail")


Router.post("/send", controllerEmail.enviarEmail);

module.exports = Router;