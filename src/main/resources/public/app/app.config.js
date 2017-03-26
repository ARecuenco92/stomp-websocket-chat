(function () {

  'use strict';

  angular
    .module('app')
    .run(appRun);

  appRun.$inject = [
    '$rootScope'
  ];

  function appRun ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      $rootScope.chat = next.chat;
    });
  }

})();