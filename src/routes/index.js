const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const HeroiController = require('../controllers/HeroiController');
const UniversoController = require('../controllers/UniversoController');

const routes = Router();

routes.post('/usuarios', UsuarioController.create);
routes.post('/usuarios/login', UsuarioController.login);

routes.post('/herois', HeroiController.create);
routes.get('/herois', HeroiController.read);
routes.delete('/herois/:id', HeroiController.delete);

routes.get('/universos', UniversoController.read);

module.exports = routes;
