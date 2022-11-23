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
            email: {
                type: DataTypes.STRING(100),
                primaryKey: true,
                allowNull: false,
                autoIncrement: false,
            },
            cod_cli: DataTypes.INTEGER(20),
        },
            {
                sequelize,
                tableName: "portal_emails",
            }
        )
    }
}
module.exports = PortalEmails