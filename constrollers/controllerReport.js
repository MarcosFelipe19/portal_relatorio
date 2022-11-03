const search = require('./controllerSearch');
const portalrelatorio = require("./controllersPortalRelatorio");
const Relatorio = require('../models/Relatorio');
const PortalLog = require('../models/PortalLog');
const date = require('./date');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
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

        let sucesso = await logReltorio(result, req.body.responsavel, relatorio.id);

        if (!sucesso) {
            return res.status(400).json({ "msg": "Refazer upload1" });
        }

        sucesso = await portalrelatorio.upload(req.body.orcamento, req.body.responsavel);

        if (!sucesso) {
            return res.status(400).json({ "msg": "Refazer upload2" });
        }

        res.status(200).json({ "msg": "Relatório cadastrado com sucesso" });
    },
    async getOne(req, res) {
        if (req.body.token && req.body.senha && req.body.nome && req.body.id) {
            let relatorio = "";
            try {
                if (portalrelatorio.download(req.body.id, req.body.nome)) {
                    relatorio = await Relatorio.findOne({
                        where: {
                            token: req.body.token,
                            senha: req.body.senha,
                            data_vencimento: { [Op.gte]: date.date_time }
                        }
                    })
                    res.json(relatorio);
                } else {
                    res.status(400).send("Não foi possível buscar o relatório");
                }
            } catch (e) {
                return res.status(400).send("Não foi possível fazer a busca!");
            }
        }
    },
    async getall(req, res) {

        try {
            let relatorio = await Relatorio.findAll({  where: {orcamento: { [Op.like]: `${req.query.q}%` }}, order:[['data_criacao', 'DESC']]});
            res.json(relatorio);
        } catch (error) {
            console.log(error);
            res.send("Não foi possível fazer a busca os relatórios!");
        }
    },
    async portal_relatorio_upload(req, res) {
        sucesso = await portalrelatorio.upload(req.body.orcamento, req.body.responsavel);

        if (!sucesso) {
            return res.status(400).json({ "msg": "Refazer upload, para cadastrar o vencimento" });
        }
        res.send('Sucesso')
    },
};

async function logReltorio(values, responsavel, id) {
    try {
        await PortalLog.create({
            tabeba_db: "portal_acessos",
            chave_primaria: "id",
            nome_chave: id,
            registro_data: data_criacao,
            registro_resp: responsavel,
            motivo: "NOVO RELATÓRIO",
            obs: `Orçamento: ${values.orcamento} Token: ${values.token}, Senha: ${values.senha}`
        })
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = prop;
