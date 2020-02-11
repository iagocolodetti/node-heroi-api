# Heroi

Projeto dividido em duas partes, WebService (node-heroi-api) e Cliente ([heroi-cliente](https://github.com/iagocolodetti/heroi-cliente/tree/v2.0 "https://github.com/iagocolodetti/heroi-cliente/tree/v2.0")).

* Downloads: https://github.com/iagocolodetti/node-heroi-api/releases
   * [Arquivo de Script SQL Server](https://github.com/iagocolodetti/node-heroi-api/releases/download/v1.0.1/heroidb_mssql.sql "heroidb_mssql.sql")
   * [Arquivo de Script MySQL](https://github.com/iagocolodetti/node-heroi-api/releases/download/v1.0.1/heroidb_mysql.sql "heroidb_mysql.sql")
   * [Código-Fonte](https://github.com/iagocolodetti/node-heroi-api/archive/v1.0.1.zip "v1.0.1.zip")
   * [heroi-cliente](https://github.com/iagocolodetti/heroi-cliente/releases/tag/v2.0 "https://github.com/iagocolodetti/heroi-cliente/releases/tag/v2.0")


## node-heroi-api

Versão em Node.js do [SpringHeroiREST](https://github.com/iagocolodetti/SpringHeroiREST "https://github.com/iagocolodetti/SpringHeroiREST").

Backend API desenvolvida utilizando: JavaScript, Sequelize, JWT, documentação com Swagger (OpenAPI 3.0.2) e banco de dados SQL Server ou MySQL.

* Para usar o banco de dados MySQL:
   * No arquivo config/.env.* mudar as configurações relacionadas ao banco: *DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD e DB_DIALECT*;
   * No *DB_DIALECT* mudar o valor de 'mssql' para 'mysql';
   * Instalar a dependência mysql2: yarn add mysql2 || npm install mysql2


-- *Como este é um projeto demonstrativo, os arquivos .env e .env.test foram mantidos.*