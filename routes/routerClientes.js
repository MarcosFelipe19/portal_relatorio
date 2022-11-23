const express = require('express');
const Router = express.Router();
const controllerClientes = require("../constrollers/controllersClientes");
const { get } = require('./routeReport');

Router.get("/get", controllerClientes.getCliente);
Router.get("/getAll", controllerClientes.getAllCliente);
Router.get("/getEmails", controllerClientes.getEmails);


module.exports = Router;