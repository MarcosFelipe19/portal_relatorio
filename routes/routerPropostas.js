const express = require('express');
const Router = express.Router();
const controllerSearch = require("../constrollers/controllerSearch");

Router.get("/all", controllerSearch.buscarOrcamentos);
Router.get("/OSs", controllerSearch.buscarOs);
// Router.get("filtro", controllerSearch.getFiltro);

module.exports = Router;