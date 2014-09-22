angular.module( 'vivace', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ngCookies',
  'vivace.user',
  'vivace.nav',
  'vivace.home',
  'vivace.portal',
  'vivace.editor'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {

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

