angular.module('tPsWeb')
  .factory('commonFunctions', commonFunctions);


var self = this;

function sort_by_date(a,b) {
  if (a.date_of_first_saturday_fixture < b.date_of_first_saturday_fixture)
    return -1;
  if (a.date_of_first_saturday_fixture > b.date_of_first_saturday_fixture)
    return 1;
  return 0;
}

function commonFunctions($q, $http, seasonsService, jwtHelper, $rootScope){
  return {
    api_call: function(method, url, data) {
      console.log('api call running...')
      console.log(data);
      var defer = $q.defer();
      var req = {
        method: method.toUpperCase(),
        // url: 'http://ec2-52-33-185-209.us-west-2.compute.amazonaws.com:3000/' + url,
        url: 'http://localhost:3000/' + url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }
      console.log(req)
      $http(req).then(function success(res) {
        if (res.status === 200) {
          console.log('commonFunctions api_call success')
          defer.resolve(res.data);
        } else {
          defer.reject(res.data);
        }
      },function error(res) {
        console.log('commonFunctions api_call error')
        defer.resolve(res)
      })
      return defer.promise;
    },
    delete_jwt: function() {
      var defer1 = $q.defer();
      localStorage.removeItem('tenpJWT')
      localStorage.removeItem('tenpUser')
      defer1.resolve('done');
      console.log('delete_jwt completed.')
      return defer1.promise;
    },
    decode_jwt: function(jwt) {
      var defer2 = $q.defer();
      try{
        defer2.resolve(jwtHelper.decodeToken(jwt))
      } catch(err) {
        defer2.reject(false)
      }
      return defer2.promise
    },
    logged_in_status: function() {
      console.log('here1')
      var defer4 = $q.defer();
      $rootScope.logged_in = false;
      if(localStorage.tenpJWT) {
        console.log('here2')
        var jwt = localStorage.tenpJWT;
        this.decode_jwt(jwt).then(function(jwt_payload) {
          console.log(jwt_payload)
          try {
            var exp_date = jwtHelper.isTokenExpired(localStorage.tenpJWT);
            console.log(exp_date)
          } catch(err) {
            // console.log('not a 3-part jwt');
          }

          if (jwt_payload.valid == true && exp_date == false) {
            console.log('here3')
            $rootScope.logged_in = true;
            // $rootScope.user = 
            defer4.resolve($rootScope.logged_in)
          } else {
            console.log('here4')
            $rootScope.logged_in = false;
            $rootScope.user = false;
            defer4.resolve($rootScope.logged_in)
          }
        })
      } else {
        console.log('here5')
        $rootScope.logged_in = false;
        $rootScope.user = false;
        defer4.resolve($rootScope.logged_in)
      }
      return defer4.promise
    },
    isAdmin: function() {
      var defer = $q.defer();
      var jwt = localStorage.tenpJWT;
      this.decode_jwt(jwt).then(function(jwt_payload) {
        $rootScope.isAdmin = jwt_payload.is_admin;
        $rootScope.username = jwt_payload.username;
        defer.resolve($rootScope.isAdmin)
        defer.resolve($rootScope.username)
      })
      return defer.promise
    },
    getCurrentSeason: function(seasons) {
      console.log('getCurrentSeason running')
      console.log(seasons)
      var defer = $q.defer();
      var season_object = {};
      self.today = new Date()
      // self.today = new Date('2017-11-01')
      console.log(self.today)
      seasons.sort(sort_by_date);

      //CONVERT seasons OBJECT DATES FROM STRING TO DATE
      angular.forEach(seasons, function(v,i) {
        v.date_of_first_saturday_fixture = new Date(v.date_of_first_saturday_fixture);
        v.date_of_last_saturday_fixture = new Date(v.date_of_last_saturday_fixture);
      })
      console.log(seasons);

      var season = false;
      var close_season = true;
      for (var i = seasons.length - 1; i >= 0; i--) {
        var first_mon_after_season = moment(seasons[i].date_of_last_saturday_fixture).add(2, 'days');
        if (self.today > seasons[i].date_of_first_saturday_fixture && self.today < first_mon_after_season) {
          //EASY, here we are, this is the season
          season = seasons[i];
          close_season = false;
        } else {
          //PROBABLY NEED TO ADD IN SOMETHING FOR A PRE-SEASON DATE OR WHATEVER.  I GUESS AS SOON AS THERE IS A NEW SEASON AND TODAY IS LESS THAN THAT SEASON... MAYBE IT DOES WORK?
          season = seasons[i];
          close_season = true;
        }
      }

      season_object = {
        season: season,
        close_season: close_season
      }

      defer.resolve(season_object);
      return defer.promise
    }, 
    getWeeks: function(season) {
      console.log(season)
      var defer = $q.defer()
      self.today = new Date()
      // self.today = new Date('2015-12-25')
      console.log('running get weeks')

      //get wintervalweeks by season
      this.api_call('GET', 'wintervalweeks/'+season.season, '').then(function(w_weeks) {
        // console.log('w_weeks ====')
        // console.log(w_weeks.wintervalweek)
        // self.w_weeks = [];
        // for (var i = w_weeks.wintervalweek.length - 1; i >= 0; i--) {
          // self.w_weeks.push(new Date(w_weeks.wintervalweek[i].start_monday_of_winterval_week))
        // }

        //self.w_weeks is simply the dump of the wintervalweeks collection in the DB
        self.w_weeks = w_weeks;
        console.log('wintervalweeks = ');
        console.log(self.w_weeks);

        //self.weeks is not from the DB. It is derived at runtime based on the seasons, season start and end dates, and the winterval weeks.
        self.weeks = [];
        self.this_week = {};
        var not_yet = true;

        var mon = moment(season.date_of_first_saturday_fixture).subtract(5, 'days');
        var x = 1;
        var all_weeks;
        var play_weeks = 0;
        var display_play_week;
        var week_mon;
        var w_w_id;
        while(mon._d < season.date_of_last_saturday_fixture) {
          var sun = new Date(moment(mon).add(6, 'days'))

          week_mon = new Date(mon._d);
          all_weeks = x;
          play_weeks++;
          display_play_week = play_weeks;
          w_week_yn = 0;
          w_w_id = '';
          for(var w in self.w_weeks.wintervalweek) {
            if (moment(week_mon).isSame(self.w_weeks.wintervalweek[w].start_monday_of_winterval_week)) {
              w_week_yn = 1;
              play_weeks--;
              display_play_week = '';
              w_w_id = self.w_weeks.wintervalweek[w]._id;
            }
          }

          var week = {
            "season": season.season,
            "all_week": all_weeks,
            "play_week": display_play_week,
            "week_start_mon": week_mon,
            "week_end_sun": new Date(moment(mon).add(6, 'days')),
            "winterval_week" : w_week_yn,
            "winterval_week_id" : w_w_id
          }
          self.weeks.push(week);

          //CHECK FOR AND CREATE THIS WEEK
          var next_mon = moment(mon._d).add(7, 'days');

          if (self.today > mon._d && self.today < next_mon._d) {
            self.this_week = {
              "season": season.season,
              "all_week": all_weeks,
              "play_week": display_play_week,
              "week_start_mon": week_mon,
              "week_end_sun": new Date(moment(mon).add(6, 'days'))
            }
            not_yet = false;
          } else if (self.today > mon._d && self.today > next_mon._d) {
            not_yet = true;
          } else if (self.today < mon._d && self.today < next_mon._d && not_yet === true) {
            self.this_week = {
              "season": season.season,
              "week": x,
              "week_start_mon": new Date(mon._d),
              "week_end_sun": new Date(moment(mon).add(6, 'days'))
            }
            not_yet = false;
          }
          mon = moment(mon._d).add(7, 'days');
          console.log
          x++;
        }
        console.log(self.weeks)
        var return_obj = {weeks: self.weeks, this_week: self.this_week};
        defer.resolve(return_obj);
      })
      return defer.promise
    },
    get_result: function(home_goals, away_goals) {
      if (home_goals > away_goals) {
        return 'home';
      } else if (home_goals < away_goals) {
        return 'away';
      } else {
        return 'draw';
      }
    },
    find_game_in_all_games: function(games, week, game) {
      return games.week == week && games.game == game;
    }
  }
};
