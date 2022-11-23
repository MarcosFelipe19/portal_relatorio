const express = require('express');
const Router = express.Router();
const controllerClientes = require("../constrollers/controllersClientes");

Router.post("/novoEmail", controllerClientes.novoEmail);
Router.get("/get", controllerClientes.getCliente);
Router.get("/getEmails", controllerClientes.getEmails);


module.exports = Router;