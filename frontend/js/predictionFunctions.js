angular.module('tPsWeb')
  .factory('predictionFunctions', predictionFunctions);

var self = this;

function predictionFunctions(commonFunctions, $q){
  return {
    post_predictions: function(pred_obj) {
      console.log(pred_obj)
      var promises = [];
      for(var i in pred_obj.result_points) {
        if ((pred_obj.home_goals[i] || pred_obj.home_goals[i] == 0) && (pred_obj.away_goals[i] || pred_obj.away_goals[i] == 0)) {
          pred = {
            user_id: pred_obj.user_id,
            season: pred_obj.season,
            week: pred_obj.week,
            game: i,
            home_goals: pred_obj.home_goals[i],
            away_goals: pred_obj.away_goals[i],
            result_points: pred_obj.result_points[i],
            score_points: pred_obj.score_points[i],
            created_datetime: new Date()
          }
          console.log(pred)
          promises.push(commonFunctions.api_call('post', 'predictions', pred))
        }
      }
      return $q.all(promises).then(function(res) {
        console.log(res)
      })
    }
  }
};
