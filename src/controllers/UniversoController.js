const JsonError = require('../errors/JsonError');
const Universo = require('../models/Universo');

module.exports = {
    async read(request, response) {
        try {
            const result = await Universo.findAll({ raw: true });
            response.json(result);
        } catch (error) {
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível buscar os universos'));
        }
    }
};
