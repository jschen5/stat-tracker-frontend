angular.module( 'stattracker', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ngCookies',
  'stattracker.user',
  'stattracker.nav',
  'stattracker.home',
  'stattracker.portal'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {

/*  $stateProvider
    .state('stats', {
      url: '/stats',
      title: 'Stats Central',
      templateUrl: 'stats/stats.tpl.html',
      controller: 'StatsCtrl'
    });*/

  // $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( $http, User ) {

  User.getCurrentUser();
/*  User.userReady().then(function () {
    if (User.loggedIn) {
      
    }
  });*/

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = 'StatTracker | ' + toState.data.pageTitle;
    }
  });
})

;

