(function () {

  'use strict';

  angular
    .module('app.chat')
    .controller('ChatCtrl', ChatCtrl);

  ChatCtrl.$inject = [
    'ChatFactory',
    '$scope',
    '$window'
  ];

  function ChatCtrl (ChatFactory, $scope, $window) {
    var vm = this;
    vm.chat;
    vm.message;

    vm.openChat    = openChat;
    vm.connect     = connect;
    vm.disconnect  = disconnect;
    vm.subscribe   = subscribe;
    vm.onMessage   = onMessage;
    vm.onAdminConnection = onAdminConnection;
    vm.onAdminDisonnection = onAdminDisonnection;
    vm.sendMessage = sendMessage;
    
    init();

    function openChat() {
      $('#chatModal').modal('show');	
      $(".btn-chat").addClass('btn-primary');
      $(".btn-chat").removeClass('btn-warning');
    }

    function connect() {
      if( vm.username !== 'admin' ) {
        ChatFactory.connect(vm.username).then(vm.subscribe, function(error){
          alert(error);
        });
      }
    }

    function disconnect() {
      ChatFactory.disconnect();
      init();
    }

    function subscribe() {
      vm.chat.username = vm.username;
      vm.username = undefined;
      ChatFactory.subscribe('/room/'+vm.chat.username, vm.onMessage);
      ChatFactory.subscribe('/admin/connect', vm.onAdminConnection);
      ChatFactory.subscribe('/admin/disconnect', vm.onAdminDisonnection);
    }

    function onAdminConnection(message) {
      vm.chat.enabled = true;
      $scope.$apply();
    }

    function onAdminDisonnection(message) {
      vm.chat.enabled = false;
      $scope.$apply();
    }
      
    function onMessage(message) {
      vm.chat.messages.push(message);
      $(".panel-chat").animate({scrollTop: $(".panel-chat > .panel-body").height()}, "slow");
      $(".btn-chat").addClass('btn-warning');
      $(".btn-chat").removeClass('btn-primary');
      $(".btn-chat").delay(100).animate({top: '-=30px'}, 'slow'); 
      $(".btn-chat").delay(100).animate({top: '+=30px'}, 'slow'); 
      $(".btn-chat").delay(100).animate({top: '-=20px'}, 'slow'); 
      $(".btn-chat").delay(100).animate({top: '+=20px'}, 'slow');

      $scope.$apply();
    }

    function sendMessage() {
      var message = {
        username: vm.chat.username,
        text: vm.message,
        date: new Date()
      }

      ChatFactory.send("/message/admin", message);
      vm.chat.messages.push(message);
      vm.message = undefined;
    }

    function init() {
      $('#chatModal').modal('hide');
      vm.chat = {};
      vm.chat.messages = [];
      vm.chat.enabled = false;
      $window.onbeforeunload = vm.disconnect;
    }
  }

})();
