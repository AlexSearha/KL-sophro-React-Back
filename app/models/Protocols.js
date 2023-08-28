const { DataTypes, Model } = require("sequelize");
const sequelize = require('../views/database');

class Protocol extends Model {}

Protocol.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, 
    {
        sequelize, 
        tableName: 'protocols'
    }
);

module.exports = Protocol;