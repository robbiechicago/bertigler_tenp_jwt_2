var Game = require('../models/gameMod');
var bodyParser = require('body-parser');

//INDEX
function getAllGames(req, res) {
  Game.find(function (err, games) {
    console.log(games)
    if(err) res.json({ message: 'Could not find any games. ' + err });

    res.json({ games: games });
    // res.json({ message: 'hellooooo!' });
  })
}
function getGamesBySeason(req, res) {
  Game.find({ season: req.params.season }, function(err, games) {
    if(err) res.json({ message: 'Could not find any games. ' + err })

    res.json({ games: games })
  })
}
function getGamesBySeasonAndWeek(req, res) {
  console.log(req.params);
  Game.find({ season: req.params.season, week: req.params.week }, function(err, games) {
    if(err) res.json({ message: 'Could not find any games. ' + err })
    console.log(games);
    res.json({ games: games })
  })
}

//NEW

//CREATE
function createGame(req, res) {
  console.log(req.body)

  var game = new Game(req.body);
  game.save(function(err) {
    if(err) res.json({ message: 'Could not save game. ' + err });

    res.json({ game: game });
  })
}

//SHOW
function getGameById(req, res) {
  var id = req.params.id;
  Game.findById({ _id: id }, function(err, game) {
    if(err) res.json({ message: 'Could not find game. ' + err });

    res.json({ game: game })
  })
}

//EDIT

//UPDATE
function updateGame(req, res) {
  var id = req.params.id;
  Game.findById({ _id: id }, function(err, game) {
    if(err) res.json({ message: 'Could not find game. ' + err });

    if(req.body.season) game.season = req.body.season;
    if(req.body.week) game.week = req.body.week;
    if(req.body.game_number) game.game_number = req.body.game_number;
    if(req.body.kickoff_datetime) game.kickoff_datetime = req.body.kickoff_datetime;
    if(req.body.home_team) game.home_team = req.body.home_team;
    if(req.body.away_team) game.away_team = req.body.away_team;
    if(req.body.inplay_home) game.inplay_home = req.body.inplay_home;
    if(req.body.inplay_away) game.inplay_away = req.body.inplay_away;
    if(req.body.final_home) game.final_home = req.body.final_home;
    if(req.body.final_away) game.final_away = req.body.final_away;

    game.save(function(err) {
      if(err) res.json({ message: 'Could not update game. ' + err });
      console.log(game);
      res.json({ message: 'User successfully updated' })
    })
  })
}

//DELETE
function removeGame(req, res) {
  var id = req.params.id;
  Game.remove({ _id: id }, function(err) {
    if(err) res.json({ message: 'Could not delete game. ' + err });

    res.json({ message: 'Game successfully deleted' })
  })
}

//EXPORT
module.exports = {
  getAllGames: getAllGames,
  getGamesBySeason: getGamesBySeason,
  getGamesBySeasonAndWeek: getGamesBySeasonAndWeek,
  createGame: createGame, 
  getGameById: getGameById,
  updateGame: updateGame,
  removeGame: removeGame
}