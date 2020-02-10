const { Model, DataTypes } = require('sequelize');

class Universo extends Model {
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
            }
        }, {
            tableName: 'universo',
            timestamps: false,
            sequelize
        });
    }
}

module.exports = Universo;
