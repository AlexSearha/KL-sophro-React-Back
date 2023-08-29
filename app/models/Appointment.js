const { DataTypes, Model } = require("sequelize");
const sequelize = require("../views/database");

class Appointment extends Model {}

Appointment.init(
    {
        date: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        reporting: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        exercices: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        paiment_due: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        paiment_value: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        protocol_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
    }, 
    {
        sequelize,
        tableName: 'appointments',
    }
);

module.exports = Appointment;