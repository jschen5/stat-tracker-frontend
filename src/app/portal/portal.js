angular.module( 'stattracker.portal', [
  'stattracker.user',
  'ui.router'
])

.config(function config($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'portal/login.tpl.html',
      controller: 'PortalCtrl',
      data: { pageTitle: 'Login' }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'portal/signup.tpl.html',
      controller: 'PortalCtrl',
      data: { pageTitle: 'Sign Up' }
    })
    ;
})

.controller('PortalCtrl', function StateCtrl($scope, $location, User) {

  /* FOR SIGNUP */
  $scope.emailSent = false;

  $scope.reset = function() {
    $scope.emailSent = false;
    $scope.signup = { username: "", email: "", pw1: "", pw2: ""};
  };

  $scope.reset();

  $scope.createAccount = function() {
    var user = {
      username: $scope.signup.username,
      email: $scope.signup.email,
      password: $scope.signup.pw1,
      password_confirmation: $scope.signup.pw2
    };

    User.signup(user)
      .success(function(data, status) {
        $scope.emailSent = true;
        $scope.dest = $scope.signup.email;
        $scope.reset();
      })
      .error(function(data, status) {
      });
  };

  /* FOR LOGIN */
  $scope.login = { email: '', password: '', rememberMe: '' };

  $scope.login = function() {
    User.login($scope.login.email, $scope.login.password, $scope.login.rememberMe)
      .success(function(response) {
        $location.path('/home');
      })
      .error(function(response) {

      });
  };
})

.directive('pwCheck', [function() {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var pw1 = '#' + attrs.pwCheck;
      elem.add(pw1).on('keyup', function() {
        scope.$apply(function() {
          var v1 = $(pw1).val();
          var v2 = elem.val();
          var v = (v2 === v1);
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  };
}])

;