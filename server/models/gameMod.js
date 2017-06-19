var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  season: {type: Number, required: true},
  week: {type: Number, required: true},
  game_number: {type: Number, required: true},
  kickoff_datetime: {type: Date, required: false},
  home_team: {type: String, required: true},
  away_team: {type: String, required: true},
  inplay_home: {type: Number},
  inplay_away: {type: Number},
  final_home: {type: Number},
  final_away: {type: Number},
})

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;