var Season = require('../models/seasonMod');

//INDEX
function getSeasons(req, res) {
  Season.find(function(err, seasons) {
    if(err) res.json({ message: 'Could not find any seasons. ' + err });

    res.json({ seasons: seasons });
  })
}

//CREATE
function createSeason(req, res) {
  console.log(req.body)

  var season = new Season(req.body);
  season.save(function(err) {
    if(err) res.json({ message: 'Could not save season. ' + err });

    res.json({ season: season });
  })
}

//SHOW
function getSeasonBySeason(req, res) {
  console.log('seasons by season')
  Season.find({ season: req.params.season }, function(err, season) {
    if(err) res.json({ message: 'Could not find season. ' + err })

    res.json({ season: season })
  })
}

//UPDATE
function updateSeason(req, res) {
  var id = req.params.id;
  Season.findById({ _id: id }, function(err, season) {
    if(err) res.json({ message: 'Could not find season. ' + err });

    if(req.body.season) season.season = req.body.season;
    if(req.body.date_of_first_saturday_fixture) season.date_of_first_saturday_fixture = req.body.date_of_first_saturday_fixture;
    if(req.body.date_of_last_saturday_fixture) season.date_of_last_saturday_fixture = req.body.date_of_last_saturday_fixture;

    season.save(function(err) {
      if(err) res.json({ message: 'Could not update season. ' + err });
      console.log(season);
      res.json({ message: 'Season successfully updated' })
    })
  })
}

//DELETE
function removeSeason(req, res) {
  var id = req.params.id;
  Season.remove({ _id: id }, function(err) {
    if(err) res.json({ message: 'Could not delete season. ' + err });

    res.json({ message: 'Season successfully deleted' })
  })
}


//EXPORT
module.exports = {
  getSeasons: getSeasons,
  createSeason: createSeason,
  getSeasonBySeason: getSeasonBySeason,
  updateSeason: updateSeason,
  removeSeason: removeSeason
}