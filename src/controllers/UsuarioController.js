const bcrypt = require('bcrypt');
const jwt = require('./JwtController');
const JsonError = require('../errors/JsonError');
const Usuario = require('../models/Usuario');
const calculateString = require('../utils/calculateString');

module.exports = {
    async create(request, response) {
        try {
            const { nome, senha } = request.body;
            const hash = bcrypt.hashSync(senha, 10);
            const result = await Usuario.create({ nome, senha: hash });
            const result_usuario = await Usuario.findOne({
                where: { 
                    id: result.id
                },
                attributes: [
                    'id',
                    'nome',
                    ['data_cadastro', 'dataCadastro']
                ]
            });
            response.json(result_usuario);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                response.status(409);
                response.json(JsonError(request, response, 'Usuário já existe'));
            } else {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível criar o usuário'));
            }
        }
    },

    async login(request, response) {
        try {
            const { nome, senha } = request.body;
            const result = await Usuario.findOne({ where: { nome }, raw: true });
            if (result && bcrypt.compareSync(senha, result.senha)) {
                const dateNow = new Date().getTime();
                const expiration = calculateString(process.env.JWT_EXPIRATION_TIME);
                response.setHeader(process.env.JWT_HEADER, jwt.getToken(result.id, result.nome, expiration));
                response.setHeader('Expires', new Date(dateNow + expiration).toGMTString());
                response.json();
            } else {
                response.status(404);
                response.json(JsonError(request, response, 'Usuário não encontrado ou senha incorreta'));
            }
        } catch (error) {
            response.status(500);
            response.json(JsonError(request, response, 'Não foi possível efetuar o login'));
        }
    }
};
