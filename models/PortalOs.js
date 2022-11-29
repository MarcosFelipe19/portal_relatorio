const { Model, DataTypes } = require("sequelize");

class PortalOs extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            orcamento: DataTypes.STRING(30),
            os: DataTypes.STRING(20),
            laboratorio: DataTypes.STRING(50),
            check: DataTypes.INTEGER(1)
        },
            {
                sequelize,
                tableName: 'portal_os'
            }
        )
    }
}

module.exports = PortalOs;