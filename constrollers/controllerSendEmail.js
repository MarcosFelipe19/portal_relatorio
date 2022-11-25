const nodemailer = require('nodemailer');

const sendEmail = {
    async enviarEmail(req, res) {
        let user = "teste@construrapidoreformas.com.br";
        let pass = "Teste123@";
        let texto = "Prezado Clente, segue o token e a senha para download dos seus relatório.\n\n" +
            "Para fazer o download dos seu(s) arquivos acesse o portal de relatórios, acesse com, token: ${req.body.token}, senha: ${req.body.senha}. acesso o portal o link a seguir:\n\n" +
            "link: relatórios";

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            auth: { user, pass }
        })

        transporter.sendMail({
            from: user,
            to: req.body.email,
            subject: `Cliente: ${req.body.nome_empresa} Orçamento: ${req.body.orcamento}`,
            text: texto,
        }).then(info => {
            return res.json({ "msg": "Sucesso!" })
        }).catch(err => {
            return res.status(400).json({ "msg": "Error" })
        })
    }
}

module.exports = sendEmail