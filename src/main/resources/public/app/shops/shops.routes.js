(function () {

  'use strict';

  angular
    .module('app.shops')
    .config(routesSetup);

  //////////

  routesSetup.$inject = [
    '$stateProvider'
  ];

  function routesSetup($stateProvider) {
    $stateProvider
      .state('section.shops', {
        url: '/shops',
        templateUrl: 'app/shops/shops.html',
        controller: 'ShopsCtrl as shopsVM',
        chat: true
      });
  }

})();
