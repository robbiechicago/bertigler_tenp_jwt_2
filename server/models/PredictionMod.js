var mongoose = require('mongoose');

var predictionSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  season: {type: Number, required: true},
  week: {type: Number, required: true},
  game: {type: Number, required: true},
  home_goals: {type: Number, required: true, max: 20},
  away_goals: {type: Number, required: true, max: 20},
  result_points: {type: Number, required: true, min: 1, max: 10},
  score_points: {type: Number, required: true, min: 1, max: 10},
  created_datetime: {type: Date, required: true}
})

var Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;