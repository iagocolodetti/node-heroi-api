const { Model, DataTypes, Sequelize } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING,
                required: true
            },
            senha: {
                type: DataTypes.STRING,
                required: true
            },
            data_cadastro: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            }
        }, {
            tableName: 'usuario',
            timestamps: false,
            sequelize
        });
    }
}

module.exports = Usuario;
