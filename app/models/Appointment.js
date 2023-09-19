const { DataTypes, Model } = require("sequelize");
const sequelize = require("../views/database");

class Appointment extends Model {}

Appointment.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'booked'
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
        payment_due: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        payment_value: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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