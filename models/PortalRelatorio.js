const { Model, DataTypes } = require("sequelize");

class PortalRelatorio extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            orcamento: {
                type:DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            revisao: DataTypes.INTEGER(11),
            upload_data: DataTypes.DATE,
            upload_nome: DataTypes.STRING,
            sup_data: DataTypes.DATE,
            sup_nome: DataTypes.STRING,
            ativo: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: "portal_relatorios"
        })
    }
};
module.exports = PortalRelatorio;