const { Sequelize, Op } = require('sequelize');
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
        if (!req.query.orcamento) {
            return res.status(400).json({ "msg": "Sem orcamento" })
        }
        try {
            var orcamentos = await Proposta.findAll({
                where: Sequelize.where(Sequelize.fn("CONCAT", Sequelize.col("codigo"), Sequelize.col("mes"), Sequelize.col("ano")), {
                    [Op.eq]: req.query.orcamento
                })
            });
            res.json(orcamentos);
        } catch (err) {
            res.json({ "msg": "Erro, Não foi possível fazer a busca!" })
        }
    },
    // async buscarOrcamentos(req, res) {
    //     try {
    //         let page = +req.query.page;
    //         let qtd = 5;
    //         let start = (page - 1) * qtd

    //         let orcamentos = await Proposta.findAll({
    //             where: Sequelize.where(Sequelize.fn("CONCAT", Sequelize.col("codigo"), Sequelize.col("mes"), Sequelize.col("ano")), {
    //                 [Op.like]: `${req.query.q}%`
    //             }),
    //             attributes: [[sequelize.fn('CONCAT', sequelize.col('codigo'),
    //                 sequelize.col('mes'), sequelize.col('ano')), 'orcamento']],
    //             order: [['Dataofe', 'DESC']],
    //             offset: start, limit: 5
    //         });
    //         res.json(orcamentos)
    //     } catch (err) {
    //         console.log(err)
    //         res.json({ "msg": "Erro, Não foi possível fazer a busca!" })
    //     }
    // },
    async buscarOs(req, res) {
        if (req.query.orcamento) {
            try {
                let os = await OsLab.findAll({ where: { orcamento: req.query.orcamento }, limit: 500 });
                return res.json(os);
            } catch (err) {
                return res.status(400).send("Error, não foi possível fazer a busca!");
            }
        } else {
            res.status(400).json({ "msg": "Error, Campos vazios!" });
        }
    },
    async buscarOsLab(req, res) {
        if (req.query.orcamento) {
            try {
                let os = await OsLab.findAll({ attributes: ['Laboratorio'], group: ['Laboratorio'], where: { orcamento: req.query.orcamento }, limit: 500 });
                return res.json(os);
            } catch (err) {
                return res.status(400).json({ "msg": "Error, não foi possível fazer a busca!" });
            }
        } else {
            res.status(400).json({ "msg": "Error, Campos vazios!" });
        }
    },
    // async getFiltro(req, res) {
    //     try {
    //         let relatorio = await OsLab.findAll({ where: { orcamento: { [Op.like]: `${req.query.q}%` } } });
    //         res.json(relatorio);
    //     } catch (error) {
    //         res.status(400).json({ "msg": "Não foi possível fazer a busca os relatórios!" });
    //     }
    // },
};

module.exports = search;