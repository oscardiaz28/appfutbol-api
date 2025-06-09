import { database } from "../config/db.js"
import { Rol } from "../models/rol.model.js"

const createRols = async () => {
    try {
        await database.authenticate()
        const isRolExists = await Rol.findOne({ where: { nombre: "ADMIN" } })

        if (!isRolExists) {
            const rol = Rol.build({
                nombre: "ADMIN"
            })
            await rol.save()
            console.log("Rol creado exitosamente")
        } else {
            console.log("El rol ya existe")
        }

    } catch (err) {
        console.log(`Error creating rols ${err}`)
    } finally {
        await database.close()
    }
}

createRols()