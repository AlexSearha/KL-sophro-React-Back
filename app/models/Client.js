import { DataTypes, Model } from "sequelize";
import sequelize from "../views/database";

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
        student: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        notifications: {
            type: DataTypes.BOOLEAN, 
            allowNull: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
        }
    }, 
    {
        sequelize, 
        tableName: 'clients'
    }
);

export default Client;