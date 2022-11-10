const express = require('express');
const Router = express.Router();
const controllerSearch = require("../constrollers/controllerSearch");

Router.get("/all", controllerSearch.buscarOrcamentos);


module.exports = Router;