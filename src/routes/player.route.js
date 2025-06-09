import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { addPlayer, deletePlayer, editPlayer, getAll, getOne, getPlayerEvaluations, searchPlayer, setPlayerAsProspecto, setPlayerStatus } from '../controllers/player.controller.js'

export const playerRoutes = express.Router()

playerRoutes.get("/:id/evaluations", checkAuth, getPlayerEvaluations)
playerRoutes.patch("/:id/active", checkAuth, setPlayerStatus)
playerRoutes.put("/:id/prospecto", checkAuth, setPlayerAsProspecto)
playerRoutes.get("/search", checkAuth, searchPlayer)

playerRoutes.get("/", checkAuth, getAll)
playerRoutes.post("/", checkAuth, addPlayer)    
playerRoutes.get("/:id", checkAuth, getOne)
playerRoutes.put("/:id", checkAuth, editPlayer)
playerRoutes.delete("/:id", checkAuth, deletePlayer)