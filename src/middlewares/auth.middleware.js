import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { Role } from '../models/role.model.js'

export const checkAuth = async (req, res, next) => {
    let token = req.headers["authorization"]
    if(!token || !token.startsWith("Bearer")){
        return res.status(401).json({message: "No autorizado: El token es requerido"})
    } 
    token = token.split(" ")[1]
    try{
        const {userId} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({
            where: {id: userId},
            attributes: {
                exclude: ['password', 'rol_id'],
            },
            include: [{model: Role, as: 'role', attributes: ['nombre']}]
        })
        if(!user){
            return res.status(400).json({message: "Usuario no encontrado"})
        }
        req.user = user.toJSON()
        next()
    }catch(err){
        console.log(`Error in auth middleware: ${err.message}`)
        res.status(500).json({message: "Token invalido"})
    }
}