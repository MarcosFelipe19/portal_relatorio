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
            orcamento: DataTypes.STRING,
            token: DataTypes.STRING(10),
            senha: DataTypes.STRING(),
            data_criacao: DataTypes.DATE,
            responsavel: DataTypes.STRING,
            ativo: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: "portal_acessos"
        })
    }
}

module.exports = Relatorio;