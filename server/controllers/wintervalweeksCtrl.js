var WintervalWeek = require('../models/wintervalweekMod');

//INDEX
function getWintervalweeks(req, res) {
  WintervalWeek.find(function(err, wintervalweeks) {
    if(err) res.json({ message: 'Could not find any wintervalweeks. ' + err });

    res.json({ wintervalweeks: wintervalweeks });
  })
}

//CREATE
function createWintervalweek(req, res) {
  console.log(req.body)

  req.body.start_monday_of_winterval_week = new Date(req.body.start_monday_of_winterval_week);
  console.log('popopopoppopop ' + typeof req.body.start_monday_of_winterval_week)
  var wintervalweek = new WintervalWeek(req.body);
  wintervalweek.save(function(err) {
    if(err) res.json({ message: 'Could not save wintervalweek. ' + err });

    res.json({ wintervalweek: wintervalweek });
  })
}

//SHOW
function getWintervalweeksBySeason(req, res) {
  console.log('wintervalweeks by season')
  WintervalWeek.find({ season: req.params.season }, function(err, wintervalweek) {
    if(err) res.json({ message: 'Could not find wintervalweek. ' + err })

    res.json({ wintervalweek: wintervalweek })
  })
}

// //UPDATE
// function updateSeason(req, res) {
//   var id = req.params.id;
//   Season.findById({ _id: id }, function(err, season) {
//     if(err) res.json({ message: 'Could not find season. ' + err });

//     if(req.body.season) season.season = req.body.season;
//     if(req.body.date_of_first_saturday_fixture) season.date_of_first_saturday_fixture = req.body.date_of_first_saturday_fixture;
//     if(req.body.date_of_last_saturday_fixture) season.date_of_last_saturday_fixture = req.body.date_of_last_saturday_fixture;

//     season.save(function(err) {
//       if(err) res.json({ message: 'Could not update season. ' + err });
//       console.log(season);
//       res.json({ message: 'Season successfully updated' })
//     })
//   })
// }

//DELETE
function removeWintervalweek(req, res) {
  var id = req.params.id;
  WintervalWeek.remove({ _id: id }, function(err) {
    if(err) res.json({ message: 'Could not delete wintervalweek. ' + err });

    res.json({ message: 'Wintervalweek successfully deleted' })
  })
}


//EXPORT
module.exports = {
  getWintervalweeks: getWintervalweeks,
  createWintervalweek: createWintervalweek,
  getWintervalweeksBySeason: getWintervalweeksBySeason,
  // updateSeason: updateSeason,
  removeWintervalweek: removeWintervalweek
}