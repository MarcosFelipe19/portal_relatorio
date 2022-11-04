const express = require("express");
const Router = express.Router();
const uploadRelatorio = require("./midlleware/uploadRelatorio")
const controllerReport = require("../constrollers/controllerReport");
const controllerPortalRelatorio = require("../constrollers/controllersPortalRelatorio");

Router.post("/new", uploadRelatorio.single("pdfrelatorio"), controllerReport.novoRelatorio);
Router.post("/portal_relatorio_upload", controllerReport.portal_relatorio_upload);
Router.get("/search", controllerReport.getOne);
Router.get("dsownload", controllerPortalRelatorio.download)
Router.get("/searchAll", controllerReport.getall);

module.exports = Router;
