angular.module('tPsWeb')
  .service('seasonsService', seasonsService);

function seasonsService($http){
  return {
    getAllSeasons: function() {
      console.log('getAllSeasons running')
      var req = {
        method:'GET',
        url:'http://localhost:3000/seasons/',
        headers: {'Content-Type': 'application/json'}
      };

      return $http(req).then(function(res){
        console.log(res);
        return res;
      })
    }
  }
};
