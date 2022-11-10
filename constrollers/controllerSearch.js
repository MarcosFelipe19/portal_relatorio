const { Sequelize } = require('sequelize');
const Proposta = require('../models/Proposta');

const search = {
    async bucarProposta(orcamento) {
        
        let result = await Proposta.findOne({
            where: Sequelize.where(Sequelize.fn("CONCAT", Sequelize.col("codigo"), Sequelize.col("mes"), Sequelize.col("ano")), orcamento)
        });
        return result;
    },
    async buscarOrcamentos (req, res) {
        try {
            let orcamentos = await Proposta.findOne();
            res.json(orcamentos)
        }catch (err) {
            res.send({"msg":"Erro, não deu certo"})
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    },

};

module.exports = search;