angular.module( 'vivace', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ngCookies',
  'vivace.user',
  'vivace.nav',
  'vivace.home',
  'vivace.portal'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {

/*  $stateProvider
    .state('stats', {
      url: '/stats',
      title: 'Stats Central',
      templateUrl: 'stats/stats.tpl.html',
      controller: 'StatsCtrl'
    });*/

  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( $http, User ) {

  User.getCurrentUser();

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = 'Vivace | ' + toState.data.pageTitle;
    }
  });
})

;

