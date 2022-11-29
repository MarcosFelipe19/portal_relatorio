const nodemailer = require('nodemailer');
const PortalEmails = require('../models/PortalEmails')
require("dotenv").config();

const sendEmail = {
    async enviarEmail(orcamento, token, senha, email, nome_empresa, link) {
        if (!orcamento || !token || !senha || !email || !nome_empresa || !link || !cod_cli) {
            return false;
        }
        let emails = ""
        for (let i = 0; i < email.length; i++) {
            emails += email[i] + ", ";
        }

        let user = process.env.USER;
        let pass = process.env.PASS;
        let texto = "<p>Prezado Clente,<br><br>Seus relatórios referente ao Orçamento: <storng>" + orcamento + "</strong> estão  disponíveis para fazer o download.<br><br>" +
            "Acesse o nosso portal de relatório no endereço: https://www.google.com/ e entre com os seguintes<br>dados abaixo: <br><br> <strong>token: </strong>" + token +
            "<br><br><strong>senha: </strong>" + senha + "<br><br>Atenciosamente<br><br>Laboratório Lab System<p>";

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORT_MAIL,
            auth: { user, pass }
        })

        try {
            await transporter.sendMail({
                from: user,
                to: emails,
                replyTo: email[1],
                subject: `Cliente: ${nome_empresa} Orçamento: ${orcamento}`,
                html: texto,
            })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = sendEmail