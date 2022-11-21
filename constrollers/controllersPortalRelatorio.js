const PortalRelatorios = require("../models/PortalRelatorio");
const PortalDownloadha = require("../models/PortalDownload");
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
            await PortalRelatorios.create({ orcamento: req.body.orcamento, download_nome: req.body.nome, download_ip: req.body.ip, download_localizacao: req.body.localizacao })
            res.json({ "msg": "Sucesso!" })
        } catch (e) {
            res.status(400).json({ "msg": "não foi possível fazer o download!" });
        }
    }
}

module.exports = portalRelatorio