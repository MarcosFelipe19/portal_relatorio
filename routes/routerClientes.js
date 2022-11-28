const express = require('express');
const Router = express.Router();
const controllerClientes = require("../constrollers/controllersClientes");

Router.post("/novoEmail", controllerClientes.novoEmail);
Router.get("/get", controllerClientes.getCliente);
Router.get("/getEmails", controllerClientes.getEmails);
Router.delete("/delete", controllerClientes.deletarEmail);
Router.put("/update", controllerClientes.updateEmail)


module.exports = Router;