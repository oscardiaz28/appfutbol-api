import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { createEvaluation, editEvaluation } from '../controllers/evaluation.controller.js'

export const evaluationRoutes = express.Router()

evaluationRoutes.post("/", checkAuth, createEvaluation)
evaluationRoutes.put("/:id", checkAuth, editEvaluation)