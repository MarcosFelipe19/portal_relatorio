const { LambdaFunctionConfigurationFilterSensitiveLog } = require('@aws-sdk/client-s3')
const PortalOs = require('../models/PortalOs')

const os = {
    async cadastrarOs(orcamento, os, laboratorio) {
        if (!orcamento || !os || !laboratorio) {
            return false
        }
        let oss = os.split(",")
        try {
            for (let i = 0; i < oss.length; i++) {
                await PortalOs.create({ orcamento, os: os[i], laboratorio, check: 1 })
            }
        } catch (e) {
            return false;
        }
        return true
    },
    buscarOs(req, res) {
        if (!req.query.orcamento) {
            return res.status(400).json({ "msg": "Sem orcamento" })
        }

        PortalOs.findAll({ where: { orcamento: req.query.orcamento, laboratorio: req.query.laboratorio } })
            .then(data => {
                return res.json(data)
            }).catch(err => {
                return res.status(400).json({ "msg": "Não foi possível fazer a busca" })
            })
    }
}

module.exports = os