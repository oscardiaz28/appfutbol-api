import { DataTypes } from "sequelize";
import { database } from "../config/db.js";

export const Evaluation = database.define('Evaluation', {
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Player',
            key: 'id'
        }
    },
    type_evaluation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TypeEvaluation',
            key: 'id'
        }
    },
    fecha: DataTypes.DATE
}, {
    tableName: "evaluations",
    freezeTableName: true,
    timestamps: false,
})