import { database } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Role = database.define('Role', {
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'roles',
    freezeTableName: true,
    timestamps: false
})