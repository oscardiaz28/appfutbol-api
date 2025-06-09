import { DetailEvaluation } from "./DetailEvaluation.model.js"
import { Evaluation } from "./evaluation.model.js"
import { ParametroEvaluation } from "./ParametroEvaluation.model.js"
import { Player } from "./player.model.js"
import { TypeEvaluation } from "./TypeEvaluation.model.js"

TypeEvaluation.hasMany(ParametroEvaluation, {foreignKey: "type_id", as: "parametros"})
ParametroEvaluation.belongsTo(TypeEvaluation, {foreignKey: "type_id", as: "tipo"})

Evaluation.belongsTo(Player, {foreignKey: "player_id", as: "player"})
Evaluation.hasMany(DetailEvaluation, {foreignKey: "evaluation_id", as: 'detail_evaluation'})

Player.hasMany(Evaluation, {foreignKey: "player_id", as: 'evaluations'})

Evaluation.belongsTo(TypeEvaluation, {foreignKey: "type_evaluation_id", as: 'tipo'})

DetailEvaluation.belongsTo(ParametroEvaluation, {foreignKey: "parameter_id", as: 'parametro'})