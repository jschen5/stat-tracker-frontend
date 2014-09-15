angular.module( 'vivace.events.view', [
  'vivace.user',
  'vivace.events'
])

.config(function config($stateProvider) {
  $stateProvider
    .state('events', {
      url: '/events',
      templateUrl: 'events/events.tpl.html',
      controller: 'EventsCtrl',
      data: { pageTitle: 'Events' }
    })
    ;
})

.controller('EventsCtrl', function EditorCtrl($scope, $location, $upload, User, Events) {

  $scope.onFileSelect = function($files) {
    var file = $files[0];

    $scope.upload = $upload.upload({
      url: '/stories',
      file: file
    }).success(function(data, status, headers, config) {
      console.log(data);
    });
  };

})

;