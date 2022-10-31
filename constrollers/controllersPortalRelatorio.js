const PortalRelatorios = require("../models/PortalRelatorio")
const { Op } = require("sequelize");
const date = require("./date")
const portalRelatorio = {
    async upload(orcamento, upload_nome, upload_vencimento) {

        if (orcamento && upload_vencimento && upload_nome) {
            try {
                await PortalRelatorios.create({
                    orcamento: orcamento,
                    revisao: 0,
                    upload_data: date.date_time,
                    upload_nome: upload_nome,
                    upload_vencimento: upload_vencimento,
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
    async data_vencimento(orcamento) {
        let result = ""
        try {
            result = await PortalRelatorios.findOne({
                where: {
                    orcamento: orcamento,
                    upload_vencimento: { [Op.gte]: date.date_time }
                }
            })
        } catch (e) {
            return false;
        }
        if (result) {
            return true;
        }
    }
}

module.exports = portalRelatorio