const PortalRelatorios = require("../models/PortalRelatorio")
const { Op } = require("sequelize");
const date = require("./date")
const portalRelatorio = {
    async upload(orcamento, upload_nome, chave_estrangeira) {

        if (orcamento && upload_nome && chave_estrangeira) {
            try {
                await PortalRelatorios.create({
                    id_portal_acessos: chave_estrangeira,
                    orcamento: orcamento,
                    revisao: 0,
                    upload_data: date.date_time,
                    upload_nome: upload_nome,
                    sup_data: undefined,
                    sup_nome: undefined,
                    ativo: 1
                })
            } catch (e) {
                return false;
            }
            return true;
        }
    },
    async download(req, res) {
        try {
            await PortalRelatorios.update({ sup_data: date.date_time, sup_nome: nome }, {
                where: {
                    id: id,
                }
            })
            res.json({ "msg": "Sucesso!" })
        } catch (e) {
            res.status(400).json({ "msg": "não foi possível fazer o download!" });
        }
    }
}

module.exports = portalRelatorio