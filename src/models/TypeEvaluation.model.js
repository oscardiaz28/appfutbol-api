import { DataTypes } from "sequelize";
import { database } from "../config/db.js";

export const TypeEvaluation = database.define('TypeEvaluation', {
    nombre: DataTypes.STRING,
    icono: DataTypes.STRING,
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "types_evaluation",
    freezeTableName: true,
    timestamps: false
})

