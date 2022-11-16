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
    async buscarOrcamentos (req, res) {
        try {
            let orcamentos = await Proposta.findAll({limit: 100});
            res.json(orcamentos)
        }catch (err) {
            res.send({"msg":"Erro, Servidor não está fora do ar"})
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    },
    async buscarOs(req, res){
        if(req.query.orcamento){
            try{
                let os = await OsLab.findAll({where: {orcamento: req.query.orcamento}, limit: 500});
                res.json({"os": os.OS});
            }catch(err){
                res.status(400).send("Error, não foi possível fazer a busca!");
            }
        }else{
            res.status(400).send("Error, Campos vazions!");
        }

    }

};

module.exports = search;