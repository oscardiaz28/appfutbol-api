import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const generateToken = (userId) => {
    const payload = {
        userId: userId
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

