const { DataTypes, Model } = require('sequelize');

class Relatorio extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            orcamento: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            token: DataTypes.STRING(10),
            senha: DataTypes.STRING(),
            data_criacao: DataTypes.DATE,
            data_vencimento: DataTypes.DATE,
            responsavel: DataTypes.STRING,
            ativo: DataTypes.INTEGER,
            link_relatorio: DataTypes.STRING,
        }, {
            sequelize,
            tableName: "portal_acessos"
        })
    }
}

module.exports = Relatorio;