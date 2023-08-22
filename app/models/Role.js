import { DataTypes, Model } from "sequelize";
import sequelize from "../views/database";

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