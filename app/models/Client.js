const { DataTypes, Model } = require("sequelize");
const sequelize = require('../views/database');

class Client extends Model {}

Client.init(
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,            
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateofbirth: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        student: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false
        },
        newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        notification: {
            type: DataTypes.BOOLEAN, 
            allowNull: true,
            defaultValue: false
        },
        confirmed: {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
    }, 
    {
        sequelize, 
        tableName: 'clients'
    }
);

module.exports = Client;