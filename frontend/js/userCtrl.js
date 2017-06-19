angular.module('tPsWeb')
  .controller('userCtrl', userCtrl);

userCtrl.$inject = ['$rootScope', '$state', '$scope', 'commonFunctions'];

function userCtrl($rootScope, $state, $scope, commonFunctions) {
  console.log('hello! userCtrl')
  var self = this;

  self.register_user = register_user;
  function register_user(user) {
    var hashed_password = CryptoJS.SHA256(user.password).toString();
    var obj = {
      'username': user.name,
      'email': user.email,
      'password': hashed_password
    }
    commonFunctions.api_call('post', 'users', obj).then(function(res) {
      console.log(res);
    })
  }

  self.login_user = login_user;
  function login_user(user) {
    var obj = {
      'username': user.name,
      'password': CryptoJS.SHA256(user.password).toString()
    }
    console.log(obj);
    commonFunctions.api_call('post', 'login', obj).then(function(res) {
      console.log('result of login attempt:')
      console.log(res);
      if (res.type == true) {

        commonFunctions.delete_jwt().then(function() {
          if (res.data.validation.token_status == 'logged_in') {
            console.log('valeeeeeeeed')
            localStorage.setItem('tenpJWT', JSON.stringify(res.data.token));
            self.user = {};
            self.user = {
              username: res.data.username,
              email: res.data.email,
              id: res.data._id,
              is_admin: res.data.is_admin
            }
            console.log(self.user);
            localStorage.setItem('tenpUser', JSON.stringify(self.user))
            $state.reload();
          }
        })
      }
    })
  }

  self.getUserStatus = getUserStatus;
  function getUserStatus() {
    commonFunctions.api_call('get', 'user/status', '').then(function(res){
      console.log(res)
    })
  }


}