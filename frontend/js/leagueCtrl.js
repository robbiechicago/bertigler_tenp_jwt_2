angular.module('tPsWeb')
  .controller('leagueCtrl', leagueCtrl);

leagueCtrl.$inject = ['commonFunctions', 'seasonsService', 'predictionsService', 'gamesService'];

function leagueCtrl(commonFunctions, seasonsService, predictionsService, gamesService) {
  console.log('hello! leagueCtrl')
  var self = this;

  // commonFunctions.api_call('GET', 'users', '').then(function(users) {
  //   console.log('users:')
  //   console.log(users);
  //   self.users = users.users;
  // })

  seasonsService.getAllSeasons().then(function(seasons) {
    self.seasons = seasons.data.seasons
    commonFunctions.getCurrentSeason(self.seasons).then(function(season) {
      self.season = season
      commonFunctions.getWeeks(self.season.season).then(function(weeks) {
        self.weeks = weeks;
        predictionsService.getPredictionsBySeason(self.season.season.season).then(function(predictions) {
          // console.log(predictions.data.predictions)
          commonFunctions.api_call('GET', 'users', '').then(function(users) {
            gamesService.getAllGames().then(function(games) {
              // console.log(games.data.games)

              self.league = {};
              // console.log(users.users)
              angular.forEach(users.users, function(user, key) {
                var user_obj = {
                  'username': user.username,
                  'user_id': user._id,
                  'result_points': 0,
                  'score_points': 0,
                  'total_points': 0,
                  'correct_results': 0,
                  'correct_scores': 0
                }
                self.league[user._id] = user_obj;
              })

              // console.log(predictions.data.predictions);
              angular.forEach(predictions.data.predictions, function(pred, key) {
                if (self.league[pred.user_id]) {
                  // if (pred.user_id == '58e0ea9c64412a43972f8ed4') {
                  //   console.log(pred);
                  // }

                  //=============
                  //GET CORRESPONDING ACTUAL GAME
                  //=============
                  var actual_game_array = games.data.games.filter(function(obj) {
                    return (obj.week == pred.week) && (obj.game_number == pred.game);
                  });
                  var actual_game = actual_game_array[0];
                  // if (pred.user_id == '58e0ea9c64412a43972f8ed4') {
                  //   console.log(actual_game);
                  // }

                  if (actual_game && typeof actual_game.final_home != 'undefined' && actual_game.final_home != '' && typeof actual_game.final_away != 'undefined' && actual_game.final_away != '') {
                    //=============
                    //GET PREDICTION RESULT
                    //=============
                    var pred_res = commonFunctions.get_result(pred.home_goals, pred.away_goals);

                    //=============
                    //GET ACTUAL GAME RESULT
                    //=============
                    var actual_game_res = commonFunctions.get_result(actual_game.final_home, actual_game.final_away);

                    //=============
                    //IF PREDICTION RESULT = ACTUAL RESULT, INCREMENT USER'S TOTAL CORRECT RESULTS BY 1
                    //=============
                    if (pred_res == actual_game_res && self.league[pred.user_id]) {
                      // if (pred.user_id == '58e0ea9c64412a43972f8ed4') {
                      //   console.log('correct result');
                      //   console.log('pred');
                      //   console.log(pred_res)
                      //   console.log(pred.home_goals)
                      //   console.log(pred.away_goals)
                      //   console.log('actual')
                      //   console.log(actual_game_res)
                      //   console.log(actual_game.final_home)
                      //   console.log(actual_game.final_away)
                      // }
                      self.league[pred.user_id].correct_results ++;
                      
                      //=============
                      //...AND ADD THE RESULT POINTS TO THE TOTAL
                      //=============
                      self.league[pred.user_id].result_points += ((pred.result_points * 2) + pred.result_points); 
                    } else {

                      //=============
                      //...OR REMOVE THE POINTS IF RESULT NOT CORRECT
                      //=============
                      self.league[pred.user_id].result_points -= pred.result_points;
                    }

                    //=============
                    //IF PREDICTION SCORE = ACTUAL SCORE, INCREMENT USER'S TOTAL CORRECT SCORES BY 1
                    //=============
                    if (pred.home_goals == actual_game.final_home && pred.away_goals == actual_game.final_away) {
                      // if (pred.user_id == '58e0ea9c64412a43972f8ed4') {
                      //   console.log('correct score');
                      // }
                      self.league[pred.user_id].correct_scores ++;

                      //=============
                      //...AND ADD THE SCORE POINTS TO THE TOTAL
                      //=============
                      self.league[pred.user_id].score_points += ((pred.score_points * 5) + pred.score_points);
                    } else {

                      //=============
                      //...OR REMOVE THE POINTS IF SCORE NOT CORRECT
                      //=============
                      self.league[pred.user_id].score_points -= pred.score_points;
                    }
                    //=============
                    //ADD SCORE AND RESULT POINTS TO MAKE TOTAL POINTS
                    //=============
                    self.league[pred.user_id].total_points = self.league[pred.user_id].result_points + self.league[pred.user_id].score_points;
                  }
                }
              })
              // console.log(self.league)

              //ITERATE THROUGH THE LEAGUE TO CONVERT IT BACK TO A PROPER ARRAY
              self.leeg = [];
              angular.forEach(self.league, function(theuser, key) {
                self.leeg.push(theuser)
                console.log(theuser);
              })
              console.log(self.leeg);
            })
          })
        })
      })
    })
  })




}


