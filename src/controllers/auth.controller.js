import bcrypt from "bcryptjs"
import { loginSchema } from "../lib/validations.js"
import { Role } from "../models/role.model.js"
import { User } from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"

export const login = async (req, res) => {
    const {error} = loginSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    try{
        const user = await User.findOne({
            where: {email: req.body.email},
            include: [{
                model: Role,
                as: 'role',
                attributes: ["nombre"]
            }]
        })
        if(!user) return res.status(400).json({message: "Credenciales inválidas"})
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Credenciales inválidas"})

        const token = generateToken(user.id);
        const {password, ...userData} = user.toJSON()
        
        res.json({user: userData, token})

    }catch(err){
        console.log(`Error in login controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}

export const verify = async (req, res) => {
    res.status(200).json(req.user)
}