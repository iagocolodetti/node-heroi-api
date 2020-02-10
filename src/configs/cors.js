module.exports = () => {
    return {
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS,
        allowedHeaders: `${process.env.JWT_HEADER}, Content-Type`,
        credentials: true,
        exposedHeaders: process.env.JWT_HEADER,
        maxAge: 3600
    };
};