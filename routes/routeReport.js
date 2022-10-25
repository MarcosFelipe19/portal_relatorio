const express = require("express");
const Router = express.Router();
const uploadRelatorio = require("./midlleware")
const controllerReport = require("../constrollers/controllerReport");

Router.post("/new", uploadRelatorio.single("pdf-relatorio"), controllerReport.novoRelatorio);

module.exports = Router;
