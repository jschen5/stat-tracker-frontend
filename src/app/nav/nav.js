angular.module( 'stattracker.nav', [
  'stattracker.user'
])

.controller('NavCtrl', function NavCtrl($scope, User) {

  $scope.loggedIn = User.loggedIn;
  $scope.username = User.username;

  User.userReady.then(function() {
    $scope.user = User;
    $scope.loggedIn = User.loggedIn;
    $scope.username = User.username;
  });

})

;