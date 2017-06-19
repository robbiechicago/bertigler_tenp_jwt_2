angular
  .module('tPsWeb', ['ui.router', 'angular-jwt', 'ngMaterial'])
  .config(mainRouter)
  .run(appRun)

function mainRouter($stateProvider, $urlRouterProvider, $httpProvider, jwtOptionsProvider, jwtInterceptorProvider) {

  jwtOptionsProvider.config({
      whiteListedDomains: ['localhost']
    });

  jwtInterceptorProvider.tokenGetter = function() {
    return localStorage.getItem('tenpJWT');
  }
  $httpProvider.interceptors.push('jwtInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'homeCtrl as hc'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'admin.html',
      controller: 'adminCtrl as ac',
      resolve: {
        commonFunctions: 'commonFunctions',
        loggy: function(commonFunctions) {
          return commonFunctions.logged_in_status()
        }
      }
    })
    .state('league', {
      url: '/league',
      templateUrl: 'league.html',
      controller: 'leagueCtrl as lc'
    })
}

function appRun($rootScope, authService, gamesService, commonFunctions) {
  console.log('Hello.  Welcome to tenpredict!');
  $rootScope.$on('$stateChangeStart', function (event, next, current) {
    console.log('route change stuff...')
    //GET LOGIN STATUS
    if(localStorage.tenpJWT) {
      commonFunctions.logged_in_status().then(function(res){
        console.log('logged in = ' + res);
      });
      commonFunctions.isAdmin().then(function(res) {
        console.log('is admin = ' + res);
      })
    }
  });
}
