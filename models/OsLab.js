const { Model, DataTypes } = require('sequelize');

class OsLab extends Model {
    static init(sequelize) {
        super.init({
            orcamento: DataTypes.STRING(20),
            OS: DataTypes.STRING(15),
            token: DataTypes.STRING,
            senha: DataTypes.STRING,
            Laboratorio: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            DataDirecionamento: DataTypes.DATE,
            RespDirecionamento: DataTypes.STRING(40),
            DataSaidaAmReceb: DataTypes.DATE,
            RespSaidaAmReceb: DataTypes.STRING(40),
            DataEntradaLaboratorio: DataTypes.DATE,
            RespEntrada: DataTypes.STRING,
            DataPrevLab: DataTypes.DATE,
            RespPrevLab: DataTypes.STRING(40),
            DataInicio: DataTypes.DATE,
            RespInicio: DataTypes.STRING(40),
            DataTermino: DataTypes.DATE,
            RespTermino: DataTypes.STRING(40),
            Status: DataTypes.STRING(100),
            DataFinalizacao: DataTypes.STRING(40),
            DataRevisado: DataTypes.DATE,
            RespRevisado: DataTypes.STRING(40),
            DataEnviado: DataTypes.DATE,
            RespEnviado: DataTypes.STRING(40),
            NA: DataTypes.INTEGER(1),
            ColetaEletronica: DataTypes.INTEGER,
            Andamento: DataTypes.STRING,
            DataEntradaMesanino: DataTypes.DATE,
            RespEntradaMesanino: DataTypes.STRING(40),
            seq: DataTypes.STRING(10),
            mes: DataTypes.STRING(2),
            ano: DataTypes.STRING(2),
            seqorc: DataTypes.STRING(10),
            mesorc: DataTypes.STRING(2),
            anoorc: DataTypes.STRING(2),
            UsuarioAssinado: DataTypes.STRING(100),
            NomeAssinado: DataTypes.STRING(100),
            DataAssinado: DataTypes.DATE,
            CheckList_Revisao: DataTypes.INTEGER,
            DataCheck_List: DataTypes.DATE,
            UsuarioCheck_List: DataTypes.STRING(50),
            RespEnsaio: DataTypes.STRING(50),
            up: DataTypes.INTEGER,
            Tipo: DataTypes.STRING(150),
            Categoria: DataTypes.STRING(150),
            PrazoPCP: DataTypes.DATE,
            ObsPCP: DataTypes.TEXT,
            IPEM: DataTypes.INTEGER(1),
            DataMaq1: DataTypes.DATE,
            RespMaq1: DataTypes.STRING(45),
            DataMaq2: DataTypes.DATE,
            RespMaq2: DataTypes.STRING(45),
            DataMaq3: DataTypes.DATE,
            RespMaq3: DataTypes.STRING(45),
            DataMaq4: DataTypes.DATE,
            RespMaq4: DataTypes.STRING(45),
            DataMaq5: DataTypes.DATE,
            DataMaq6: DataTypes.DATE,
            RespMaq6: DataTypes.STRING(45),
            Quimico: DataTypes.INTEGER,
            subcontratado: DataTypes.INTEGER(1),
            Data_Subcontratacao: DataTypes.DATE,
            DataFin_coleta: DataTypes.DATE,
            RespFin_coleta: DataTypes.STRING(50),
            datacriacaoos: DataTypes.DATE,
            teste: DataTypes.STRING(45),
        },
            {
                sequelize,
                tableName: "ordemservico_laboratorio"
            })
    }
}

module.exports = OsLab