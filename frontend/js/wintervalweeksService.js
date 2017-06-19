angular.module('tPsWeb')
  .service('wintervalweeksService', wintervalweeksService);

function wintervalweeksService($http){
  return {
    getAllwintervalweeks: function() {
      console.log('getAllwintervalweeks running')
      var req = {
        method:'GET',
        url:'http://localhost:3000/wintervalweeks/',
        headers: {'Content-Type': 'application/json'}
      };

      return $http(req).then(function(res){
        console.log(res);
        return res;
      })
    },
    createWintervalweek: function() {
      
    }
  }
};
