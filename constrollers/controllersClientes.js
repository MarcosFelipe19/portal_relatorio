const PortalClientes = require("../models/PortalClientes");
const PortalEmails = require("../models/PortalEmails");

const clientes = {
    async novoCliente(req, res) {
        if (req.body.nome_empresa && req.body.endereco && req.body.email) {
            let email = "";
            try {
                email = await PortalEmails.create({ email: req.body.email })
            } catch (error) {
                return res.status(400).json({ "msg": "Error, Não foi possível cadastrar!" })
            }

            try {
                await PortalClientes.create({
                    nome_empresa: req.body.nome_empresa,
                    endereco: req.body.endereco,
                    id_email: email.id,
                })
                return res.json({ "msg": "Cliente gravado com sucesso!" })
            } catch (error) {
                return res.status(400).json({ "msg": "Error, não foi possível gravar o cliente!" })
            }
        }
        return res.status(400).json({ "msg": "Error, campos vazios não são permitidos!" });
    },
    getCliente(req, res) {

    }
}
module.exports = clientes;