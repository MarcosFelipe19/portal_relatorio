const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const dbConfigU83TI = require('../config/databaseU83TI');

const Proposta = require('../mondels/Proposta');
const Relatorio = require('../mondels/Relatorio');
const PortalLog = require('../mondels/PortalLog');
const PortalRelatorio = require('../mondels/PortalRelatorio');

const connection = new Sequelize(dbConfig);
const connectionU83TI = new Sequelize(dbConfigU83TI);

Proposta.init(connection);
Relatorio.init(connectionU83TI);
PortalLog.init(connectionU83TI);
PortalRelatorio.init(connectionU83TI);


module.exports = connection;