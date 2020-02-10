const parseBoolean = require('../utils/parseBoolean');

module.exports = () => {
    return {
        database: process.env.DB,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: parseBoolean(process.env.DB_LOGGING) ? console.log : false
    };
};
