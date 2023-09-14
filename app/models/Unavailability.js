const { DataTypes, Model } = require("sequelize");
const sequelize = require("../views/database");

class Unavailability extends Model {}

Unavailability.init(
    {
        date: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        days_of_week_from: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        days_of_week_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    }, 
    {
        sequelize,
        tableName: 'unavailabilities',
    }
);

module.exports = Unavailability;