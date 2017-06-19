var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to minipulate POST

var usersCtrl = require('../controllers/usersCtrl');
var gamesCtrl = require('../controllers/gamesCtrl');
var seasonsCtrl = require('../controllers/seasonsCtrl');
var wintervalweeksCtrl = require('../controllers/wintervalweeksCtrl');
var predictionsCtrl = require('../controllers/predictionsCtrl');
// var staticController = require('../controllers/staticController');


// USER API

router.route('/users')
  .get(usersCtrl.getAllUsers)
  .post(usersCtrl.createUser);

router.route('/login')
  .post(usersCtrl.loginUser);

router.route('/users/:id')
  .get(usersCtrl.getUserById)
  .put(usersCtrl.updateUser)
  .delete(usersCtrl.removeUser);

router.route('/user/status')
  .get(usersCtrl.getUserStatus);


// GAMES API

router.route('/games')
  .get(gamesCtrl.getAllGames)
  .post(gamesCtrl.createGame);

router.route('/games/:id')
  .get(gamesCtrl.getGameById)
  .put(gamesCtrl.updateGame)
  .delete(gamesCtrl.removeGame);

router.route('/games/season/:season')
  .get(gamesCtrl.getGamesBySeason)

router.route('/games/season/:season/week/:week')
  .get(gamesCtrl.getGamesBySeasonAndWeek)


// SEASON API

router.route('/seasons')
  .get(seasonsCtrl.getSeasons)
  .post(seasonsCtrl.createSeason)

router.route('/seasons/:id')
  .put(seasonsCtrl.updateSeason)
  .delete(seasonsCtrl.removeSeason);

router.route('/seasons/:season')
  .get(seasonsCtrl.getSeasonBySeason)


// WINTERVAL WEEKS API

router.route('/wintervalweeks')
  .get(wintervalweeksCtrl.getWintervalweeks)
  .post(wintervalweeksCtrl.createWintervalweek)

router.route('/wintervalweeks/:id')
//   .put(wintervalweeksCtrl.updateSeason)
  .delete(wintervalweeksCtrl.removeWintervalweek);

router.route('/wintervalweeks/:season')
  .get(wintervalweeksCtrl.getWintervalweeksBySeason)


//PREDICTIONS API

router.route('/predictions')
  .get(predictionsCtrl.getAllPredictions)
  .post(predictionsCtrl.createPrediction)

router.route('/predictions/user/:user')
  .get(predictionsCtrl.getPredictionsByUser)

router.route('/predictions/season/:season')
  .get(predictionsCtrl.getPredictionsBySeason)

router.route('/predictions/user/:user/season/:season')
  .get(predictionsCtrl.getPredictionsByUserSeason)

// router.route('/predictions/user/:user/season/:season/week/:week')
//   .get(predictionsCtrl.getPredictionsByUserSeasonWeek)








// //STATIC ROUTES
// router.route('/')
//   .get(staticController.login)

// router.route('/go')
//   .get(authenticatedUser, staticController.go)

// router.route('/lang')
//   .get(authenticatedUser, staticController.lang)

// router.route('/getName')
//   .get(authenticatedUser, staticController.getName)

// router.route('/home')
//   .get(authenticatedUser, staticController.renderHome)

// router.route('/compliment')
//   .get(authenticatedUser, staticController.renderCompliment)

// router.route('/smoke')
//   .get(authenticatedUser, staticController.renderSmoke)

// router.route('/drink')
//   .get(authenticatedUser, staticController.renderDrink)

// router.route('/drinkType')
//   .get(authenticatedUser, staticController.renderDrinkType)

// router.route('/selfie')
//   .get(authenticatedUser, staticController.renderCamera)


//  //AUTHENTICATION ROUTES 

// router.route('/login')
//   .post(staticController.postLogin)

// router.route("/logout")
//   .get(staticController.getLogout)

// router.route('/authfail')
//   .get(staticController.authFail)

// router.route('/register')
//   .get(staticController.registerUserPage)
//   .post(staticController.registerUser)

// router.route('/authsuccess')
//   .get(authenticatedUser, staticController.authSuccess)


// //ACTIVITY ROUTE
// router.route('/activity/post')
//   .post(staticController.postActivity)



module.exports = router;