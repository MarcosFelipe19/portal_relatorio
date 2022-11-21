const PortalClientes = require("../models/PortalClientes");
const PortalEmails = require("../models/PortalEmails");

const clientes = {
    async novoCliente(req, res) {
        if (req.body.nome_empresa && req.body.endereco && req.body.email) {
            let cliente = "";
            try {
                cliente = await PortalClientes.create({
                    nome_empresa: req.body.nome_empresa,
                    endereco: req.body.endereco,
                })
            } catch (error) {
                console.log(error);
                return res.status(400).json({ "msg": "Error, não foi possível gravar o cliente!" })
            }
            try {
                await PortalEmails.create({ email: req.body.email, id_cliente: cliente.id })
                return res.json({ "msg": "Sucesso, Cliente cadastrado" })
            } catch (error) {
                return res.status(400).json({ "msg": "Error, não foi possível cadastrar o email" })

            }
        }
        return res.status(400).json({ "msg": "Error, campos vazios não são permitidos!" });
    },
    async novoEmais(req, res) {
        if (!req.body.email || !req.body.id_cliente) {
            return res.status(400).json({ "msg": "Campos vazios não são permitidos!" })
        }

        try {
            await PortalEmails.create({ email: req.body.email, id_cliente: req.body.id_cliente })
            return res.json({ "msg": "Sucesso, email cadastrado" });
        } catch (error) {
            return res.status(400).json({ "msg": "Error, não foi possível cadastrar" });
        }
    },
    async getCliente(req, res) {
        if (!req.query.id) {
            return res.status(400).json("msg", "Error, não foi possível fazer a busca")
        }
        try {
            let cliente = await PortalClientes.findOne({ where: { id: req.query.id } });
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