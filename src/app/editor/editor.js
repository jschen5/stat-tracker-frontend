angular.module( 'vivace.editor', [
  'vivace.user'
])

.config(function config($stateProvider) {
  $stateProvider
    .state('editor', {
      url: '/editor',
      templateUrl: 'editor/editor.tpl.html',
      controller: 'EditorCtrl',
      data: { pageTitle: 'Editor' }
    })
    ;
})

.controller('EditorCtrl', function EditorCtrl($scope, $location, User) {

  $(function () {
    $('#editor-container').vivaceMusicEditor({});
  });

})

;