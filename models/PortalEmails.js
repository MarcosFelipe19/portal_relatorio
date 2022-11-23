const { Model, DataTypes } = require("sequelize");

class PortalEmails extends Model {
    static init(sequelize) {
        super.init({
            email: {
                type: DataTypes.STRING(100),
                primaryKey: true,
                allowNull: false,
                autoIncrement: false,
            },
            cod_cli: {
                type: DataTypes.INTEGER(20),
                primaryKey: true,
                allowNull: false,
                autoIncrement: false,
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