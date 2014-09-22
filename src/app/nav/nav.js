angular.module( 'vivace.nav', [
  'vivace.user'
])

.controller('NavCtrl', function NavCtrl($scope, $location, User) {

  $scope.loggedIn = User.loggedIn;
  $scope.username = User.username;

  User.userReady.then(function() {
    $scope.user = User;
    $scope.loggedIn = User.loggedIn;
    $scope.username = User.username;
  });

  $scope.logout = User.logout;

  $scope.navClass = function (path) {
    return $location.path() === path;
  };
})

;