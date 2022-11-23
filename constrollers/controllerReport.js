const search = require('./controllerSearch');
const portalrelatorio = require("./controllersPortalRelatorio");
const Relatorio = require('../models/Relatorio');
const PortalLog = require('../models/PortalLog');
const date = require('./date');
const { Op } = require('sequelize');
const PortalRelatorio = require('../models/PortalRelatorio');
const data_criacao = date.date_time;
const prop = {
    async novoRelatorio(req, res) {
        if (!req.file || !req.body.orcamento || !req.body.responsavel || !req.body.upload_vencimento) {
            return res.status(400).json({ "msg": "Error, Campos vazios não são permitidos!" });
        }

        let result = "";
        try {
            result = await search.bucarProposta(req.body.orcamento);
        } catch (e) {
            return res.status(400)({ "msg": "Error ao buscar o relatório!" });
        }
        if (!result) {
            return res.status(400).json({ "msg": "Erro orçamento não existe!" })
        }
        if (!result.token || !result.senha) {
            return res.status(400).json({ "msg": "Esse orcamento não tem token e senha!" });
        }
        try {
            var relatorio = await Relatorio.create({
                orcamento: req.body.orcamento,
                token: result.token,
                senha: result.senha,
                data_criacao: data_criacao,
                data_vencimento: req.body.upload_vencimento,
                responsavel: req.body.responsavel,
                ativo: 1,
                link_relatorio: req.file.location
            })
        } catch (error) {
            return res.status(400).json({ "msg": "Error, não foi possível cadastrar o relatório" });
        }

        let sucesso = await logReltorio(relatorio, req.body.responsavel, relatorio.id, "NOVO RELATÓRIO");

        if (!sucesso) {
            return res.status(400).json(relatorio);
        }

        sucesso = await portalrelatorio.upload(req.body.orcamento, req.body.responsavel, relatorio.id);

        if (!sucesso) {
            return res.status(400).json(relatorio);
        }

        res.status(200).json(relatorio);
    },
    async getOne(req, res) {
        if (req.query.token && req.query.senha) {
            let relatorio = "";
            try {
                relatorio = await Relatorio.findAll({
                    where: {
                        token: req.query.token,
                        senha: req.query.senha,
                        // data_vencimento: { [Op.gte]: date.date_time }
                    }
                })
                res.json(relatorio);
            } catch (e) {
                return res.status(400).json({ "msg": "Não foi possível fazer a busca!" });
            }
        } else {
            return res.status(400).json({ "msg": "Campos vazios não são permitidos" })
        }
    },
    async getall(req, res) {
        try {
            let relatorio = await Relatorio.findAll({ where: { orcamento: { [Op.like]: `${req.query.q}%` } }, order: [['data_criacao', 'DESC']] });
            res.json(relatorio);
        } catch (error) {
            res.status(400).json({ "msg": "Não foi possível fazer a busca os relatórios!" });
        }
    },
    async portal_relatorio_upload(req, res) {
        sucesso = await portalrelatorio.upload(req.body.orcamento, req.body.responsavel, req.body.chave_estrangeira);

        if (!sucesso) {
            return res.status(400).json({ "msg": "Refazer upload, para cadastrar o vencimento" });
        }
        res.json({ "msg": "Sucesso" })
    },
};

async function logReltorio(values, responsavel, id, motivo) {
    try {
        await PortalLog.create({
            tabela_db: "portal_acessos",
            chave_primaria: "id",
            nome_chave: id,
            registro_data: data_criacao,
            registro_resp: responsavel,
            motivo: motivo,
            obs: `Orçamento: ${values.orcamento} Token: ${values.token}, Senha: ${values.senha}`
        })
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = prop;
