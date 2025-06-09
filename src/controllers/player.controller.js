import { Op } from "sequelize"
import { addPlayerSchema } from "../lib/validations.js"
import { Player } from "../models/player.model.js"
import { User } from "../models/user.model.js"
import { Evaluation } from "../models/evaluation.model.js"
import { TypeEvaluation } from "../models/TypeEvaluation.model.js"
import { DetailEvaluation } from "../models/DetailEvaluation.model.js"
import { ParametroEvaluation } from "../models/ParametroEvaluation.model.js"

export const getAll = async (req, res) => {
    /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Obtener todos los jugadores registrados"
     */
    let {page = 1, size = 5, posicion} = req.query
    page = parseInt(page)
    size = parseInt(size)
    if(isNaN(page) || page < 1) page = 1
    if(isNaN(size) || size < 1) size = 5

    const limit = size
    const offset = (page - 1) * limit;
    const where = {}
    if(posicion){
        where.posicion = posicion // where = { posicion: 'parametro' }
    }
    try{
        console.log(where)
        const {count, rows} = await Player.findAndCountAll({
            where, limit, offset
        })
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows
        })

    }catch(err){
        console.log(`Error in getAll controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}

export const addPlayer = async (req, res) => {
     /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Registrar un jugador"
     */
    const {id} = req.user
    const {error} = addPlayerSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    const {nombre, apellido, fecha_nacimiento, fecha_registro, identificacion, pais, 
        talla, peso, pie_habil, posicion} = req.body
    try{
        const user = await User.findOne({where: {id: id}})
        if(!user) return res.status(400).json({message: "Usuario no encontrado"})
        
        const player = Player.build({
            nombre, apellido, fecha_nacimiento, fecha_registro, identificacion, pais, user_id: id, talla, peso, pie_habil, posicion
        })
        const saved = await player.save()
        const {user_id, ...response} = saved.toJSON()
        res.json(response)

    }catch(err){
        console.log(`Error in addPlayer controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}


export const getOne = async (req, res) => {
     /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Obtener a un jugador"
     */
    const {id} = req.params
    if( isNaN(id) ){
        return res.status(400).json({message: "El ID es inválido"})
    }
    try{
        const player = await Player.findOne({where: {id: id}})
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})
        const {user_id, ...response} = player.toJSON()
        res.json(response)    

    }catch(err){
        console.log(`Error in getOne controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}


export const editPlayer = async (req, res) => {
     /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Actualizar datos de un jugador"
     */
    const {id} = req.params
    if( isNaN(id) ){
        return res.status(400).json({message: "El ID es inválido"})
    }
    try{
        const player = await Player.findOne({where: {id: id}})
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})
        await player.update(req.body);
        res.json(player.toJSON())

    }catch(err){
        console.log(`Error in editPlayer controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}


export const setPlayerStatus = async (req, res) => {
     /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Establece estado de un jugador (activo/desactivado)"
     */
    const {id} = req.params
    if( isNaN(id) ){
        return res.status(400).json({message: "El ID es inválido"})
    }
    try{
        const player = await Player.findByPk(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})

        player.activo = !player.activo
        await player.save()
        res.json(player)
        
    }catch(err){
        console.log(`Error in setPlayerStatus controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}


export const setPlayerAsProspecto = async (req, res) => {
     /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Marcar jugador como prospecto (seguimiento)"
     */
    const {id} = req.params
    if( isNaN(id) ){
        return res.status(400).json({message: "El ID es inválido"})
    }
    try{
        const player = await Player.findByPk(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})

        player.prospecto = !player.prospecto
        await player.save()

        res.json(player.toJSON())

    }catch(err){
        console.log(`Error in setPlayerAsProspecto controller: ${err.message}`)
        res.status(500).json({message: "Ha ocurrido un error, intenta más tarde"})
    }
}


export const searchPlayer = async (req, res) => {
     /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Buscar jugador por nombre y/o apellido"
     */
    const query = req.query.query || ""
    try{
        let players;
        if(query.trim() === ""){
            players = []
        }else{
            players = await Player.findAll({
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: `%${query}%` } },
                        { apellido: { [Op.like]: `%${query}%` } }
                    ]
                }
            })
        }
        res.json(players)
    }catch(err){
        console.log(`Error in searchPlayer controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido realizar la busqueda de jugadores"})
    }
}


export const deletePlayer = async (req, res) => {
      /**
    #swagger.tags = ['Jugadores'] 
    #swagger.summary = "Eliminar un jugador"
     */
    const {id} = req.params
    if( isNaN(id) ){
        return res.status(400).json({message: "El ID es inválido"})
    }
    try{
        const player = await Player.findByPk(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})
        await player.destroy()
        res.json({message: "Jugador eliminado correctamente"})
    }catch(err){
        console.log(`Error in deletePlayer controller: ${err.message}`)
        res.status(500).json({message: "No se ha podido borrar al jugador"})
    }
}


export const getPlayerEvaluations = async (req, res) => {
    /**
    #swagger.tags = ['Evaluaciones'] 
    #swagger.summary = "Obtener evaluaciones de un jugadorr"
     */
    const {id} = req.params
    if(isNaN(id)){
        return res.status(400).json({message: "El id no es valido"})
    }
    try{
        const player = await Player.findByPk(id)
        if(!player) return res.status(400).json({message: "Jugador no encontrado"})

        const evaluations = await Evaluation.findAll({
            where: {player_id: id},
            include: [
                {model: TypeEvaluation, as: 'tipo'}, 
                {model: DetailEvaluation, as: 'detail_evaluation', 
                    include: {model: ParametroEvaluation, as: 'parametro'}}
            ]
        })
        res.json(evaluations)
    }catch(err){
        console.log()
        res.status(500).json({message: "No se ha podido obtener las evaluaciones del jugador"})
    }
}