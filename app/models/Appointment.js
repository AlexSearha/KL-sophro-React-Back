import { DataTypes, Model } from "sequelize";
import sequelize from "../views/database.js";

class Appointment extends Model {}

Appointment.init(
    {
        date: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        online: {
            type: DataTypes.STRING,
            allowNull: false,
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        paiment_due: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paiment_value: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
        },
    }, 
    {
        sequelize,
        tableName: 'appointments',
    }
);

export default Appointment;