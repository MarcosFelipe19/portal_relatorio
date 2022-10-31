const express = require("express");
const Router = express.Router();
const uploadRelatorio = require("./midlleware/uploadRelatorio")
const controllerReport = require("../constrollers/controllerReport");

Router.post("/new", uploadRelatorio.single("pdfrelatorio"), controllerReport.novoRelatorio);
Router.post("/upload_vencimento",  controllerReport.upload_vencimento);
Router.get("/search", controllerReport.getOne);
Router.get("/searchAll", controllerReport.getall);

module.exports = Router;
