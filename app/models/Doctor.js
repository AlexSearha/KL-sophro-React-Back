import { DataTypes, Model } from "sequelize";
import sequelize from "../views/database.js";

class Doctor extends Model {}

Doctor.init(
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: false,
        },
        notification: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
        }
    }, 
    {
        sequelize,
        tableName: 'doctors',
    }
);

export default Doctor;