const { Model, DataTypes } = require("sequelize");

class PortalEmails extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            email: DataTypes.STRING(100),
            id_cliente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'portal_clientes', key: 'id' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
            {
                sequelize,
                tableName: "portal_emails",
            }
        )
    }
}
module.exports = PortalEmails