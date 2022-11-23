const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const dbConfigU83TI = require('../config/databaseU83TI');
const Proposta = require('../models/Proposta');
const Relatorio = require('../models/Relatorio');
const PortalLog = require('../models/PortalLog');
const PortalRelatorio = require('../models/PortalRelatorio');
const OsLab = require('../models/OsLab');
const PortalDownload = require("../models/PortalDownload");
const PortalEmails = require("../models/PortalEmails");
const portalClientes = require("../models/PortalClientes");
const Clientes = require("../models/Clientes");

const connection = new Sequelize(dbConfig);
const connectionU83TI = new Sequelize(dbConfigU83TI);

Proposta.init(connection);
Relatorio.init(connectionU83TI);
PortalLog.init(connectionU83TI);
PortalRelatorio.init(connectionU83TI);
OsLab.init(connection);
PortalDownload.init(connectionU83TI);
PortalEmails.init(connectionU83TI);
portalClientes.init(connectionU83TI);
Clientes.init(connection);


module.exports = connection;