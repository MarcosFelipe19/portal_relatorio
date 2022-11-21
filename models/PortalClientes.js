const { Model, DataTypes } = require("sequelize");

class PortalClientes extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome_empresa: DataTypes.STRING,
            endereco: DataTypes.STRING,
        }, {
            sequelize,
            tableName: "portal_clientes",
        })
    }
}
module.exports = PortalClientes