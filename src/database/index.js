const { Sequelize } = require('sequelize');
const dbConfig = require('../configs/database');
const Usuario = require('../models/Usuario');
const Heroi = require('../models/Heroi');
const Poder = require('../models/Poder');
const Universo = require('../models/Universo');

let sequelize;
module.exports = {
    connect() {
        sequelize = new Sequelize(dbConfig());
        sequelize.authenticate().then(() => {
            Usuario.init(sequelize);
            Heroi.init(sequelize);
            Poder.init(sequelize);
            Universo.init(sequelize);
            Heroi.hasMany(Poder, { as: process.env.DB_PODER_ALIAS, foreignKey: 'heroi_id' });
            Heroi.belongsTo(Universo, { as: Universo.tableName, foreignKey: 'universo_id' });
            console.log(`Conexão com '${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}' estabelecida`);
        }).catch(() => {
            console.log(`Não foi possível estabelecer a conexão com '${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}'`);
        });
    },

    async getTransaction() {
        return await sequelize.transaction();
    }
};
