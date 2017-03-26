(function () {

  'use strict';

  angular
    .module('app')
    .directive('chat', ChatDirective);

  ChatDirective.$inject = [];

  function ChatDirective () {
    return {
      templateUrl: 'app/chat/chat.html',
      controller: 'ChatCtrl as chatVM'
    }
  }

})();
