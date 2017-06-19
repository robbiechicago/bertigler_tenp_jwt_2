angular.module('tPsWeb')
  .factory('authService', authService);

function authService($http, $q, commonFunctions){
  var user = null;

  return {
    isLoggedIn: function() {
      console.log('running isLoggedIn')
      if(user) {
        return true;
      } else {
        return false;
      }
    },
    getUserStatus: function() {
      console.log('getUserStatus')
      commonFunctions.api_call('get', 'user/status', '').then(function(res) {
        console.log(res);
        // return user;  
      })
    }
  }
}