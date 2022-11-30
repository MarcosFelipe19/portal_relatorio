const Clientes = require("../models/Clientes");
const PortalEmails = require("../models/PortalEmails");

const clientes = {
    async novoEmail(req, res) {
        if (!req.body.email || !req.body.cod_cli) {
            return res.status(400).json({ "msg": "Campos vazios não são permitidos!" })
        }
        try {
            let email = await PortalEmails.findOne({ where: { email: req.body.email, cod_cli: req.body.cod_cli } })

            if (email) {
                return res.status(400).json({ "msg": "Email já cadastrado" })
            }
        } catch (err) {
            return res.status(500).json({ "msg": "Error mysql" })
        }

        try {
            await PortalEmails.create({ email: req.body.email, cod_cli: req.body.cod_cli })
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
    async getEmails(req, res) {
        if (!req.query.cod_cli) {
            return res.status(400).json({ "msg": "Error, não foi possível buscar os emails" })
        }
        try {
            let emails = await PortalEmails.findAll({ where: { cod_cli: req.query.cod_cli } });
            res.json(emails);
        } catch (error) {
            return res.status(400).json({ "msg": "Error, não foi possível fazer a buscar" })
        }
    },
    async deletarEmail(req, res) {
        if (!req.query.id) {
            return res.status(400).json({ "msg": "Error, está faltando o id" });
        }
        try {
            await PortalEmails.destroy({ where: { id: req.query.id } })
            res.json({ "msg": "Sucesso, email deletado!" })
        } catch (error) {
            res.status(400).json({ "msg": "Error, não foi possível detelar" })
        }
    },
    async updateEmail(req, res) {
        if (req.query.id) {
            return res.status(400).json({ "msg": "Error, está faltando o id" });
        }
        try {
            let email = await PortalEmails.update({ email: req.query.emailNovo }, { where: { id: req.query.id } })
            return res.json({ email })
        } catch (error) {
            return res.status(400).json({ "msg": "Error, campos vazios" });
        }
    }
}
module.exports = clientes;