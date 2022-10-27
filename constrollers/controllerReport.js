const search = require('./controllerSearch');
const Relatorio = require('../mondels/Relatorio');
const PortalLog = require('../mondels/PortalLog');
const date = new Date();
let data_criacao = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


const prop = {
    async novoRelatorio(req, res) {

        if (!req.body.orcamento && !req.body.responsavel) {
            return res.status(400).json({"msg":"Error, Campos vazios não são permitidos!"});
        }

        let result = "";
        try {
            result = await search.bucarProposta(req.body.orcamento);
           
        } catch (e) {
            return res.status(400)({"msg":"Error ao buscar o relatório!"});
        }

        try {
            console.log(result);
            var relatorio = await Relatorio.create({
                orcamento: req.body.orcamento,
                token: result.token,
                senha: result.senha,
                data_criacao: data_criacao,
                responsavel: req.body.responsavel,
                ativo: 1,
                link_relatorio: req.file.location
            })
        } catch (error) {
            return res.status(400).json({"msg":"Error, não foi possível cadastrar o relatório"});
        }

        let sucesso = await logReltorio(result, req.body.responsavel, relatorio.id)
        
        if(sucesso == false){
            return res.status(400).json({"msg": "Refazer upload"});
        }

        res.send({"msg":"Relatório cadastrado com sucesso"});
    },
    async buscarRelatorio(req, res) {
        if (req.body.token && req.body.senha) {
            try {
                let relatorio = await Relatorio.findOne({
                    where: {
                        token: req.body.token,
                        senha: req.body.senha
                    }
                })
                return res.json(relatorio)
            } catch (e) {
                return res.status(404).send("Não foi possível fazer a busca!");
            }
        }
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
}

module.exports = prop;
