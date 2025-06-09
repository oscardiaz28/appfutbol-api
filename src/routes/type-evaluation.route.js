import express from 'express'
import { checkAuth } from '../middlewares/auth.middleware.js'
import { addParameter, addTypeEvaluation, getAllTypes, getParameters } from '../controllers/type-evaluation.controller.js'

export const typeEvaluationRoutes = express.Router()

typeEvaluationRoutes.get("/:id/parameters", checkAuth, getParameters)

typeEvaluationRoutes.post("/", checkAuth, addTypeEvaluation)
typeEvaluationRoutes.post("/parameters", checkAuth, addParameter);
typeEvaluationRoutes.get("/", checkAuth, getAllTypes)