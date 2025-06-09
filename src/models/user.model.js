import { database } from "../config/db.js";
import { DataTypes } from "sequelize";
import { Role } from "./role.model.js";

export const User = database.define("User", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "roles",
            key: "id"
        }
    }
}, {
    tableName: "users",
    freezeTableName: true,
    timestamps: false
})

User.belongsTo(Role, {foreignKey: "rol_id", as: 'role'})
