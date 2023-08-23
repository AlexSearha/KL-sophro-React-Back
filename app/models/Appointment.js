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
            defaultValue: false,
        },
        reporting: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        exercices: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        paiment_due: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        paiment_value: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: 0,
        },
        client_id: {
            type: DataTypes.INTEGER,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    }, 
    {
        sequelize,
        tableName: 'appointments',
    }
);

module.exports = Appointment;