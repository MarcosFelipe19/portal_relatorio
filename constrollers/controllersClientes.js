const Clientes = require("../models/Clientes");
const PortalEmails = require("../models/PortalEmails");

const clientes = {
    async novoEmail(req, res) {
        if (!req.body.email || !req.body.cod_cli) {
            return res.status(400).json({ "msg": "Campos vazios não são permitidos!" })
        }

        try {
            await PortalEmails.create({ email: req.body.email, id_cliente: req.body.cod_cli })
            return res.json({ "msg": "Sucesso, email cadastrado" });
        } catch (error) {
            return res.status(400).json({ "msg": "Error, não foi possível cadastrar" });
        }
    },
    async getCliente(req, res) {

        if (!req.query.cod_cli) {
            return res.status(400).json({ "msg": "Error, não foi possível fazer a busca" })
        }
        try {
            let cliente = await Clientes.findOne({ attributes: ['Fantasia'], where: { CODCLI: req.query.cod_cli } });
            res.json(cliente)
        } catch (error) {
            return await res.status(400).json({ "msg": "Error, não foi possível buscar o cliente" });
        }
    },
    async getAllCliente(req, res) {
        try {
            let cliente = await PortalClientes.findAll({ limit: 100 });
            res.json(cliente)
        } catch (error) {
            return await res.status(400).json({ "msg": "Error, não foi possível buscar o cliente" });
        }
    },
    async getEmails(req, res) {
        if (!req.query.id_cliente) {
            return res.status(400).json({ "msg": "Error, não foi possível buscar os emails" })
        }
        try {
            let emails = await PortalEmails.findAll({ where: { id_cliente: req.query.id_cliente } });
            res.json(emails);
        } catch (error) {
            return res.s
        }
    }
}
module.exports = clientes;