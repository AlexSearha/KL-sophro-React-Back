const { DataTypes, Model } = require("sequelize");
const sequelize = require("../views/database");

class Role extends Model {}

Role.init(
  {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'roles',
  }
);

module.exports = Role;