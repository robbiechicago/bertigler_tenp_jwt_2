angular.module('tPsWeb')
  .controller('adminCtrl', adminCtrl);

adminCtrl.$inject = ['$scope', '$state', 'commonFunctions', 'gamesService', 'seasonsService', 'predictionFunctions', '$q'];

function adminCtrl($scope, $state, commonFunctions, gamesService, seasonsService, predictionFunctions, $q) {
  var self = this;
  self.isLoggedIn = $scope.logged_in;
  self.isAdmin = $scope.isAdmin;
  self.user = $scope.username;

  commonFunctions.api_call('GET', 'users', '').then(function(users) {
    console.log('users:')
    console.log(users);
    self.users = users.users;
  })


  commonFunctions.api_call('GET', 'wintervalweeks', '').then(function(w_weeks) {
    self.w_weeks = w_weeks;
  })

  seasonsService.getAllSeasons().then(function(seasons) {
    self.seasons = seasons.data.seasons
    commonFunctions.getCurrentSeason(self.seasons).then(function(season) {
      self.season = season
      commonFunctions.getWeeks(self.season.season).then(function(weeks) {
        self.weeks = weeks;
        gamesService.getAllGames().then(function(games) {
          self.games = games.data.games
          self.current_week = weeks.this_week.week;

          self.home_goals = {}
          self.away_goals = {}
          self.hda = {}
          self.result_points = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1}
          self.score_points = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1}
          
          console.log(self.games)

        })
      })
    })
  })

  self.set_winterval = set_winterval;
  function set_winterval(season, week_start_mon) {
    var data = {
      season: season,
      start_monday_of_winterval_week: new Date(week_start_mon).toISOString(),
      status: 1
    }
    commonFunctions.api_call('POST', 'wintervalweeks', data).then(function() {
      commonFunctions.api_call('GET', 'wintervalweeks', '').then(function(w_weeks) {
        self.w_weeks = w_weeks;
      })
    })
  }

  self.delete_winterval = delete_winterval;
  function delete_winterval(id) {
    var data = {
      id: id
    }
    console.log('runing delete_winterval')
    console.log(data);
    commonFunctions.api_call('DELETE', 'wintervalweeks/' + id, data).then(function() {
      commonFunctions.api_call('GET', 'wintervalweeks', '').then(function(w_weeks) {
        self.w_weeks = w_weeks;
      })
    })
  }

  self.weekly_games_filter = weekly_games_filter;
  function weekly_games_filter(season, week) {
    console.log(season + '=====' + week);
    return function(game) {
      return game.season == season && game.week == week;
    }
  }

  self.weeks_row_class = weeks_row_class;
  function weeks_row_class(season, week) {
    var counter = 0;
    for (var i = self.games.length - 1; i >= 0; i--) {
      if(self.games[i].season == season && self.games[i].week == week) {
        counter++;
      }
    }
    return counter > 0 ? 'green' : 'red';
  }


  self.goHome = goHome;
  function goHome() {
    $state.go('home');
  }

}