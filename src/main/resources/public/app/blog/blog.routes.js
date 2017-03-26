(function () {

  'use strict';

  angular
    .module('app.blog')
    .config(routesSetup);

  //////////

  routesSetup.$inject = [
    '$stateProvider'
  ];

  function routesSetup($stateProvider) {
    $stateProvider
      .state('section.blog', {
        url: '/blog',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl as blogVM',
        chat: false
      });
  }

})();
