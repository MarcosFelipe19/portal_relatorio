const {Model, DataTypes} = require("sequelize");

class PortalDownload extends Model {
    static init(sequelize){
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            email: DataTypes.STRING(100)
        },
        {
            sequelize,
            tableName: "portal_emails",
        }
        )
    }
}
module.exports = PortalDownload