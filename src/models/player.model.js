import { DataTypes } from "sequelize";
import { database } from "../config/db.js";
import { User } from "./user.model.js";

export const Player = database.define('Player', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    fecha_registro: DataTypes.DATE,
    identificacion: DataTypes.STRING,
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    talla: DataTypes.DECIMAL(3,2),
    peso: DataTypes.DECIMAL(5,2),
    pie_habil: DataTypes.STRING,
    posicion: DataTypes.STRING,
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    prospecto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "players",
    freezeTableName: true,
    timestamps: false
})

Player.belongsTo(User, {foreignKey: "user_id"})

