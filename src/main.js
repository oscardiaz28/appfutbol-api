import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { database } from './config/db.js'
import { authRoutes } from './routes/auth.route.js'
import { playerRoutes } from './routes/player.route.js'
import { typeEvaluationRoutes } from './routes/type-evaluation.route.js'
import { evaluationRoutes } from './routes/evaluation.route.js'
import swaggerUI from 'swagger-ui-express'
import fs from 'node:fs'

import './models/index.js';


database.authenticate()
.then( () => console.log('Database connected') )
.catch( () => console.log("Error en la conexion a la bd"))

dotenv.config()
const PORT = process.env.PORT || 5001

const app = express()
const swaggerDocumentation = JSON.parse(fs.readFileSync(new URL('../swagger.json', import.meta.url)));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRoutes)
app.use("/api/players", playerRoutes)
app.use("/api/type-evaluation", typeEvaluationRoutes)
app.use("/api/evaluations", evaluationRoutes)

app.use((req, res, next) => {
    res.status(400).json({message: "Endpoint not found"})
})

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})