var Prediction = require('../models/predictionMod');
var bodyParser = require('body-parser');


// router.route('/predictions')
//   .get(predictionsCtrl.getAllPredictions)
//   .post(predictionsCtrl.createPrediction)

// router.route('/predictions/user/:user')
//   .get(predictionsCtrl.getPredictionsByUser)

// router.route('/predictions/user/:user/season/:season')
//   .get(predictionsCtrl.getPredictionsByUserSeason)

// router.route('/predictions/user/:user/season/:season/week/:week')
//   .get(predictionsCtrl.getPredictionsByUserSeasonWeek)

//INDEX
function getAllPredictions(req, res) {
  Prediction.find(function(err, predictions) {
    if(err) res.json({ message: 'Could not find any predictions. ' + err });

    res.json({ predictions: predictions });
  })
}
function getPredictionsByUser(req, res) {
  Prediction.find({ user_id: req.params.user }, function(err, predictions) {
    if(err) res.json({ message: 'Could not find any predictions. ' + err })

    res.json({ predictions: predictions })
  })
}
function getPredictionsBySeason(req, res) {
  Prediction.find({ season: req.params.season }, function(err, predictions) {
    if(err) res.json({ message: 'Could not find any predictions for this season. ' + err })

    res.json({ predictions: predictions })
  })
}
function getPredictionsByUserSeason(req, res) {
  Prediction.find({ user: req.params.user, season: req.params.season }, function(err, predictions) {
    if(err) res.json({ message: 'Could not find any predictions. ' + err })

    res.json({ predictions: predictions })
  })
}

//NEW

//CREATE
function createPrediction(req, res) {
  console.log(req.body)
  var prediction = new Prediction(req.body);
  prediction.save(function(err) {
    if(err) res.json({ message: 'Could not save prediction. ' + err });

    res.json({ prediction: prediction });
  })
}



//EXPORT
module.exports = {
  getAllPredictions: getAllPredictions,
  getPredictionsByUser: getPredictionsByUser,
  getPredictionsBySeason: getPredictionsBySeason,
  getPredictionsByUserSeason: getPredictionsByUserSeason,
  createPrediction: createPrediction
}