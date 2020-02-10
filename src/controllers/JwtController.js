const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

module.exports = {
    getToken(id, nome, expiration) {
        const dateNow = Math.floor(Date.now() / 1000);
        const token = jwt.sign({
            iss: 'herois api',
            jti: id,
            sub: nome,
            iat: dateNow,
            exp: dateNow + (expiration / 1000)
        }, process.env.JWT_SECRET, { algorithm: 'HS512' });
        return `${process.env.JWT_TOKEN_PREFIX} ${token}`;
    },

    getIdFromToken(token) {
        if (token) {
            const _token = token.replace(`${process.env.JWT_TOKEN_PREFIX} `, '');
            let id;
            jwt.verify(_token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    switch (error.name) {
                        case 'TokenExpiredError':
                            throw new AuthenticationError(401, 'Token de autenticação expirado');
                        case 'JsonWebTokenError':
                            throw new AuthenticationError(401, 'Token de autenticação inválido');
                    }
                } else {
                    id = decoded.jti;
                }
            });
            return id;
        } else {
            throw new AuthenticationError(400, 'Token de autenticação não informado no cabeçalho');
        }
    }
};
