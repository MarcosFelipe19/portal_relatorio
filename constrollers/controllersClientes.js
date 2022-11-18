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
                return res.status(400).json({ "msg": "Error, não foi possível gravar o cliente!" })
            }
            try {
                await PortalEmails.create({ email: req.body.email, id_cliente: cliente.id })
            } catch (error) {

            }
        }
        return res.status(400).json({ "msg": "Error, campos vazios não são permitidos!" });
    },
    getCliente(req, res) {

    }
}
module.exports = clientes;