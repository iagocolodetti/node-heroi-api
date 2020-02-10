const { Model, DataTypes } = require('sequelize');

class Poder extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            descricao: {
                type: DataTypes.STRING,
                required: true
            },
            heroi_id: {
                type: DataTypes.INTEGER,
                required: true
            }
        }, {
            tableName: 'poder',
            timestamps: false,
            sequelize
        });
    }
}

module.exports = Poder;
