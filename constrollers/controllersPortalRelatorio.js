const PortalRelatorios = require("../models/PortalRelatorio")
const { Op } = require("sequelize");
const date = require("./date")
const portalRelatorio = {
    async upload(orcamento, upload_nome) {

        if (orcamento && upload_nome) {
            try {
                await PortalRelatorios.create({
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
}

module.exports = portalRelatorio