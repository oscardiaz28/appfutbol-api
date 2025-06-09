import { DataTypes } from "sequelize";
import { database } from "../config/db.js";

export const DetailEvaluation = database.define('DetailEvaluation', {
    evaluation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Evaluation',
            key: 'id'
        }
    },
    parameter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ParametroEvaluation',
            key: 'id'
        }
    },
    value: DataTypes.INTEGER
}, {
    timestamps: false,
    tableName: "details_evaluation",
    freezeTableName: true
})