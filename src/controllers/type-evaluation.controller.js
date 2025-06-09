import { ParametroEvaluation } from "../models/ParametroEvaluation.model.js"
import { TypeEvaluation } from "../models/TypeEvaluation.model.js"

export const addTypeEvaluation = async (req, res) => {
      /**
    #swagger.tags = ['Tipo de Evaluaciones'] 
    #swagger.summary = "Agregar un tipo de evaluacion"
    #swagger.parameters['obj'] = {
         in: 'body',
         required: true,
         schema: {
            "nombre": "Fisica",
            "icono": "⚽"
        }
     }
     */
    const {nombre, icono} = req.body || {}
    if(nombre.trim() === "" ){
        return res.status(400).json({message: "El nombre es obligatorio"})
    }
    try{
        const tipo = await TypeEvaluation.create({
            nombre, icono
        })
        res.json(tipo)
    }catch(err){
        console.log(`Error in addTypeEvaluation controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido crear el tipo de evaluación"})
    }
}

export const addParameter = async (req, res) => {
     /**
    #swagger.tags = ['Tipo de Evaluaciones'] 
    #swagger.summary = "Agregar parametros de evaluacion"
    #swagger.parameters['obj'] = {
         in: 'body',
         required: true,
         schema: {
            "nombre": "Velocidad",
            "descripcion": "Velocidad alcanzada por el jugador",
            "typeId": 1
        }
     }
     */
    const {nombre, descripcion, typeId} = req.body || {}
    if(isNaN(typeId)){
        return res.status(400).json({message: "Parámetro inválido"})
    }
    try{
        const tipo = await TypeEvaluation.findByPk(typeId)
        if(!tipo) return res.status(400).json({message: "Tipo de Evaluación no encontrada"})

        const parametro = await ParametroEvaluation.create({
            nombre, descripcion, type_id: tipo.id
        })
        res.json(parametro.toJSON())

    }catch(err){
        console.log(`Error in addParameter controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido crear el parametro de evaluación"})
    }
}


export const getAllTypes = async (req, res) => {
     /**
    #swagger.tags = ['Tipo de Evaluaciones'] 
    #swagger.summary = "Listar los tipos de evaluaciones disponibles"
     */
    try{
        const tipos = await TypeEvaluation.findAll({where: {estado: true}});
        res.json(tipos)
    }catch(err){
        console.log(`Error in getAllTypes controller: ${err.message}`)
        res.status(500).json({message: "Erro al obtener los tipos de evaluaciones"})
    }
}


export const getParameters = async (req, res) => {
     /**
    #swagger.tags = ['Tipo de Evaluaciones'] 
    #swagger.summary = "Obtener los parametros de un tipo de evaluacion"
     */
    const {id} = req.params
    if(isNaN(id)) return res.status(400).json({message: "El ID no es válido"})
    try{
        const tipo = await TypeEvaluation.findByPk(id, {
            include: [
                {
                    model: ParametroEvaluation,
                    as: 'parametros',
                    attributes: ["id", "nombre", "descripcion"]
                }
            ]
        })
        if(!tipo) return res.status(400).json({message: "El tipo de evaluación no existe"})
        res.json(tipo)

    }catch(err){
        console.log(`Error in getParameters controller: ${err.message}`)
        res.status(500).json({message: "Erro al obtener los parametros de evaluación"})
    }
}