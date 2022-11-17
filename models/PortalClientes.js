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
            nome_empresa: DataTypes.STRING(100),
            endereco: DataTypes.STRING,
            id_email: {
                type: DataTypes.INTEGER,
                references:{model: 'portal_emails', key: 'id'}
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        {
            sequelize,
            tableName: "portal_clientes",
        }
        )
    }
}
module.exports = PortalDownload