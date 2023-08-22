import { DataTypes, Model } from "sequelize";
import sequelize from "../views/database.js";

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

export default Role;