const express = require('express');
const Router = express.Router();
const controllersOs = require("../constrollers/controllersOs");

Router.get("/buscar", controllersOs.buscarOs);

module.exports = Router;