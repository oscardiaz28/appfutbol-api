import { DataTypes } from "sequelize";
import { database } from "../config/db.js";

export const ParametroEvaluation = database.define('ParametroEvaluation', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "TypeEvaluation",
            key: "id"
        }
    }
}, {
    timestamps: false,
    tableName: "parameters_evaluation",
    freezeTableName: true
})
