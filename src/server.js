const express = require('express');
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('./database');
const routes = require('./routes');
const corsConfig = require('./configs/cors');

config({ path: join(__dirname, '../config/', `.${process.env.NODE_ENV}`) });
ok(process.env.NODE_ENV === 'env' || process.env.NODE_ENV === 'env.test', 'env inválido.');

db.connect();

const app = express();

app.use(cors(corsConfig()));

app.use(express.json());

const swaggerDocument = YAML.load(join(__dirname, './configs/swagger.yaml'));
app.use(`${process.env.BASE_PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(process.env.BASE_PATH, routes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.SERVER_PORT}`);
});
