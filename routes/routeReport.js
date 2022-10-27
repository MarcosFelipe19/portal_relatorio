const express = require("express");
const Router = express.Router();
const uploadRelatorio = require("./midlleware/uploadRelatorio")
const controllerReport = require("../constrollers/controllerReport");

Router.post("/new", uploadRelatorio.single("pdfrelatorio"), controllerReport.novoRelatorio);
Router.get("/search", controllerReport.buscarRelatorio);

module.exports = Router;
