const search = require('./controllersSearch');
const portalrelatorio = require("./controllersPortalRelatorio");
const Relatorio = require('../models/Relatorio');
const date = require('./date');
const { Op } = require('sequelize');
const data_criacao = date.date_time;
const controlersSendEmail = require("./controllersSendEmail");
const prop = {
    async novoRelatorio(req, res) {
        if (!req.file || !req.body.orcamento || !req.body.responsavel || !req.body.upload_vencimento || !req.body.email || !req.body.nome_empresa) {
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

        sucesso = await portalrelatorio.upload(req.body.orcamento, req.body.responsavel, relatorio.id);

        if (!sucesso) {
            return res.status(400).json(relatorio);
        }

        let isEmail = await controlersSendEmail.enviarEmail(req.body.orcamento, relatorio.token, relatorio.senha, req.body.email, req.body.nome_empresa)

        if (isEmail) {
            res.json({ "msg": "Sucesso, Relatório gravado e enviado com sucesso" });
        } else {
            res.json({ "msg": "Sucesso, Relatório gravado, mas não foi possível enviar" })
        }
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

module.exports = prop;
