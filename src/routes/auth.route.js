import express from 'express'
import { login, verify } from '../controllers/auth.controller.js'
import { checkAuth } from '../middlewares/auth.middleware.js'

export const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.get("/verify", checkAuth, verify)