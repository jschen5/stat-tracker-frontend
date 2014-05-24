angular.module( 'stattracker.user', [
])

.service('User', function ($http, $q) {

  var self = this;

  var userReady = $q.defer();

  this.userReady = userReady.promise;
  this.loggedIn = false;
  this.id = "";
  this.email = "";
  this.username = "";

  var setUser = function(user) {
    self.loggedIn = true;
    self.id = user.id;
    self.email = user.email;
    self.username = user.username;
  };

  this.signup = function(user) {
    return $http.post('/users.json', { user: user });
  };

  this.login = function(_email, _password, _remember) {
    return $http.post('/users/sign_in.json', { user: {email: _email, password: _password, remember: _remember } })
      .success(function(response) {
        setUser(response.user);
        userReady.resolve();
      })
      .error(function(response) {

      });
  };

  this.getCurrentUser = function() {
    return $http.get('/users/current')
      .success(function (response) {
        setUser(response.user);
        userReady.resolve();
      })
      .error(function (response) {

      });
  };
})

;