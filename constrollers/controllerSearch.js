const { Sequelize } = require('sequelize');
const Proposta = require('../models/Proposta');
const OsLab = require('../models/OsLab');
const search = {
    async bucarProposta(orcamento) {

        let result = await Proposta.findOne({
            where: Sequelize.where(Sequelize.fn("CONCAT", Sequelize.col("codigo"), Sequelize.col("mes"), Sequelize.col("ano")), orcamento)
        });
        return result;
    },
    async buscarOrcamentos(req, res) {
        try {
            let orcamentos = await Proposta.findAll({ order: [['Dataofe', 'DESC']], limit: 500 });
            res.json(orcamentos)
        } catch (err) {
            res.send({ "msg": "Erro, Servidor está fora do ar" })
        }
    },
    async buscarOs(req, res) {
        if (req.query.orcamento) {
            try {
                let os = await OsLab.findAll({ where: { orcamento: req.query.orcamento }, limit: 500 });
                return res.json(os);
            } catch (err) {
                return res.status(400).send("Error, não foi possível fazer a busca!");
            }
        } else {
            res.status(400).send("Error, Campos vazios!");
        }

    },
    async getFiltro(req, res) {
        try {
            let relatorio = await OsLab.findAll({ where: { orcamento: { [Op.like]: `${req.query.q}%` } } });
            res.json(relatorio);
        } catch (error) {
            res.status(400).json({ "msg": "Não foi possível fazer a busca os relatórios!" });
        }
    },
};

module.exports = search;