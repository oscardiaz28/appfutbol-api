import { Sequelize } from "sequelize";
import { database } from "../config/db.js";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import { hashPassword } from "../lib/utils.js";

const createAdmin = async () => {
    try{
        await database.authenticate().then( () => console.log('connection successfully') )
        const adminExists = await User.findOne({where: {email: "john@gmail.com"}})

        if(!adminExists){
            const adminRol = await Role.findOne({where: {nombre: "ADMIN"}})
            const hashedPass = await hashPassword("1234")

            await User.create({
                nombre: "John",
                apellido: "Doe",
                username: "admin",
                email: "john@gmail.com",
                password: hashedPass,
                rol_id: adminRol.id
            })
            console.log("Usuario Admin creado");

        }else{
            console.log("usuario ya existente")
        }
    }catch(err){
        console.log(`Error creating admin: ${err}`)
    }finally{
        await database.close()
    }
}
createAdmin()