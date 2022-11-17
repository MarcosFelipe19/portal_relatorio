const express = require('express');
const Router = express.Router();
const controllerClientes = require("../constrollers/controllersClientes");
const { get } = require('./routeReport');

Router.post("/novo", controllerClientes.novoCliente);
Router.get("/get", controllerClientes.getCliente);


module.exports = Router;