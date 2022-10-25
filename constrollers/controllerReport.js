const search = require('./controllerSearch');
const Relatorio = require('../mondels/Relatorio');

const prop = {
    async novoRelatorio(req, res) {
        let result = "";
        const date = new Date();
        let data_criacao = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +" "+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        try {
            result = await search.bucarProposta(req.body.orcamento);
        } catch (e) {
            res.send("Error ao buscar o relatório");
        }
        console.log(result);
        /*
            código para subir os arquivos para o s3
        */
        try {
            await Relatorio.create({
                orcamento: req.body.orcamento,
                token: result.token,
                senha: result.senha,
                data_criacao: data_criacao,
                responsavel: req.body.responsavel,
                ativo: 1
            })
            res.send("funcionou");
        } catch (error) {
            console.log(error);
        }

        res.send('teste');
    },

};
module.exports = prop;
