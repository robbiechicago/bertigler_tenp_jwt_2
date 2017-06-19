angular.module('tPsWeb')
  .service('predictionsService', predictionsService);

function predictionsService($http){
  return {
    getPredictionsBySeason: function(season) {
      console.log('getPredictionsBySeason running')
      var req = {
        method:'GET',
        url:'http://localhost:3000/predictions/season/' + season,
        headers: {'Content-Type': 'application/json'}
      };

      return $http(req).then(function(res){
        console.log(res);
        return res;
      })
    }
  }
};
