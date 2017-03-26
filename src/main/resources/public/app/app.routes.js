(function () {

  'use strict';

  angular
    .module('app')
    .config(routesSetup);

  //////////

  routesSetup.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function routesSetup($stateProvider, $urlRouterProvider) {
    $stateProvider
      // parent state of all tabs
      .state('section', {
        url: '/section',
        abstract: true,
        templateUrl: 'app/layout/sections.html'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminChatCtrl as adminChatVM'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/section/products');
  }

})();
