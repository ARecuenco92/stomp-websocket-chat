(function () {

  'use strict';

  angular
    .module('app.products')
    .config(routesSetup);

  //////////

  routesSetup.$inject = [
    '$stateProvider'
  ];

  function routesSetup($stateProvider) {
    $stateProvider
      .state('section.products', {
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl as produtsVM',
        chat: true
      });
  }

})();
