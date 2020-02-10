const { Model, DataTypes, Sequelize } = require('sequelize');

class Heroi extends Model {
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
            data_cadastro: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            universo_id: {
                type: DataTypes.INTEGER,
                required: true
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                required: true
            },
            ativo: {
                type: DataTypes.TINYINT,
                defaultValue: '1',
                allowNull: false
            }
        }, {
            tableName: 'heroi',
            timestamps: false,
            sequelize
        });
    }
}

module.exports = Heroi;
