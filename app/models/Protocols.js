const { DataTypes, Model } = require("sequelize");
const sequelize = require('../views/database');

class Protocol extends Model {

    async removeFromProtocol(appointment) {
        await this.removeAppointment(appointment);
    } 

    async addToProtocol(appointment) {
        await this.addAppointment(appointment);
    }
}

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
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, 
    {
        sequelize, 
        tableName: 'protocols'
    }
);

module.exports = Protocol;