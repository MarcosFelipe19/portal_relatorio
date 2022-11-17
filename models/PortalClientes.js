const { Model, DataTypes } = require("sequelize");

class PortalClientes extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            nome_empresa: DataTypes.STRING(100),
            endereco: DataTypes.STRING,
            id_email: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'portal_emails', key: 'id' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
            {
                sequelize,
                tableName: "portal_clientes",
            }
        )
    }
}
module.exports = PortalClientes