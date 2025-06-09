import { where } from "sequelize"
import { DetailEvaluation } from "../models/DetailEvaluation.model.js"
import { Evaluation } from "../models/evaluation.model.js"
import { Player } from "../models/player.model.js"
import { TypeEvaluation } from "../models/TypeEvaluation.model.js"

export const createEvaluation = async (req, res) => {
    const {playerId, tipoId, fecha, parametros} = req.body || {}
    try{
        const player = await Player.findByPk(playerId)
        if(!player) return res.status(400).json({message: "El jugador no existe"})

        const tipo = await TypeEvaluation.findByPk(tipoId)
        if(!tipo) return res.status(400).json({message: "El tipo de evaluación no existe"})

        const evaluacion = await Evaluation.create({
            player_id: player.id,
            type_evaluation_id: tipoId,
            fecha
        })
        const evaluacionParametros = parametros.map( p => ({
            evaluation_id: evaluacion.id,
            parameter_id: p.parametroId,
            value: p.valor
        }))
        await DetailEvaluation.bulkCreate(evaluacionParametros)
        res.json(evaluacion)

    }catch(err){
        console.log(`Error in createEvaluation controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido crear la evaluación"})
    }
}

export const editEvaluation = async (req, res) => {
    const {id: evaluationId} = req.params
    const {parametros} = req.body
    if(isNaN(evaluationId)) return res.status(400).json({message: "El ID no es valido"})
    try{
        const evaluation = await Evaluation.findByPk(evaluationId)
        if(!evaluation) return res.status(400).json({message: "La evaluacion no existe"})
        // update `details_evaluation` set value = 3 where evaluation_id = 3 and parameter_id = 1
        for(const {parametroId, valor} of parametros ){
            await DetailEvaluation.update(
                {value: valor},
                {
                    where: {
                        evaluation_id: evaluationId,
                        parameter_id: parametroId
                    }
                }
            )
        }
        res.json({message: "Valores actualizados correctamente"})
    }catch(err){
        console.log(`Error in editEvaluation controller: ${err.message}`)
        res.status(500).json({message: "No se puedo editar la evaluación"})
    }
}