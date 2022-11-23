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