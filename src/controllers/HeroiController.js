const db = require('../database');
const jwt = require('./JwtController');
const JsonError = require('../errors/JsonError');
const Heroi = require('../models/Heroi');
const Poder = require('../models/Poder');
const Universo = require('../models/Universo');

module.exports = {
    async create(request, response) {
        try {
            const usuario_id = jwt.getIdFromToken(request.headers[process.env.JWT_HEADER.toLowerCase()]);
            let transaction;
            try {
                transaction = await db.getTransaction();
                const heroi = request.body;
                const result_heroi = await Heroi.create({
                    nome: heroi.nome,
                    universo_id: heroi.universo.id,
                    usuario_id
                }, {
                    transaction
                });
                const { id: heroi_id } = result_heroi.get({ plain: true });
                await Promise.all(heroi.poderes.map(async poder => {
                    await Poder.create({
                        descricao: poder.descricao,
                        heroi_id
                    }, { 
                        transaction
                    });
                }));
                transaction.commit();
                const result = await Heroi.findOne({
                    where: {
                        id: heroi_id
                    },
                    attributes: [
                        'id',
                        'nome',
                        ['data_cadastro', 'dataCadastro'],
                        'ativo'
                    ],
                    include: [{
                        model: Poder,
                        as: process.env.DB_PODER_ALIAS,
                        attributes: [
                            'id',
                            'descricao'
                        ]
                    }, {
                        model: Universo,
                        as: Universo.tableName
                    }],
                    raw: false
                });
                response.status(201);
                response.json(result.get({ plain: true }));
            } catch (error) {
                if (transaction) {
                    transaction.rollback();
                }
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível cadastrar o herói'));
            }
        } catch (error) {
            response.status(error.status);
            response.json(JsonError(request, response, error.message));
        }
    },

    async read(request, response) {
        try {
            const usuario_id = jwt.getIdFromToken(request.headers[process.env.JWT_HEADER.toLowerCase()]);
            try {
                const result = await Heroi.findAll({
                    where: {
                        usuario_id,
                        ativo: 1
                    },
                    attributes: [
                        'id',
                        'nome',
                        ['data_cadastro', 'dataCadastro'],
                        'ativo'
                    ],
                    include: [{
                        model: Poder,
                        as: process.env.DB_PODER_ALIAS,
                        attributes: [
                            'id',
                            'descricao'
                        ]
                    }, {
                        model: Universo,
                        as: Universo.tableName
                    }],
                    raw: false
                });
                let herois = [];
                result.map(heroi => {
                    herois.push(heroi.get({ plain: true }));
                });
                response.json(herois);
            } catch (error) {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível buscar os heróis'));
            }
        } catch (error) {
            response.status(error.status);
            response.json(JsonError(request, response, error.message));
        }
    },

    async delete(request, response) {
        try {
            const usuario_id = jwt.getIdFromToken(request.headers[process.env.JWT_HEADER.toLowerCase()]);
            try {
                const result = await Heroi.findOne({
                    where: {
                        id: request.params.id,
                        usuario_id
                    }
                });
                if (result) {
                    await result.update({ ativo: 0 });
                    response.send();
                } else {
                    response.status(404);
                    response.json(JsonError(request, response, 'Herói não encontrado'));
                }
            } catch (error) {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível excluir o herói'));
            }
        } catch (error) {
            response.status(error.status);
            response.json(JsonError(request, response, error.message));
        }
    }
};
