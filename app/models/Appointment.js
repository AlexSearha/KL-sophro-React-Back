import { DataTypes, Model } from "sequelize";
import sequelize from "../views/database.js";

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
        },
    }, 
    {
        sequelize,
        tableName: 'appointments',
    }
);

export default Appointment;