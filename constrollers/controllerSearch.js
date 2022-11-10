const { Sequelize } = require('sequelize');
const Proposta = require('../models/Proposta');

const search = {
    async bucarProposta(orcamento) {
        
        let result = await Proposta.findOne({
            where: Sequelize.where(Sequelize.fn("CONCAT", Sequelize.col("codigo"), Sequelize.col("mes"), Sequelize.col("ano")), orcamento)
        });
        return result;
    },
    buscarOrcamentos: (req, res) =>{
        Proposta.findAll({ limit: 1 }).then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json({"msg":"Error, no servidor não foi possível fazer a busca"});
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    },

};

module.exports = search;