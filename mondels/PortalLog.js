const { Model, DataTypes } = require("sequelize");

class PortalLog extends Model {
    static init(sequelize) {
        super.init({
            registro: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            tabela_db: DataTypes.STRING,
            chave_primaria: DataTypes.STRING,
            nome_chave: DataTypes.STRING,
            registro_data: DataTypes.DATE,
            registro_resp: DataTypes.STRING,
            motivo: DataTypes.STRING,
            obs: DataTypes.TEXT,
        }, {
            sequelize,
            tableName: "portal_log"
        })
    }
};
module.exports = PortalLog;
