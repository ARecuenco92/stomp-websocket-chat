(function () {

  'use strict';

  angular
    .module('app.chat')
    .controller('AdminChatCtrl', AdminChatCtrl);

  AdminChatCtrl.$inject = [
    'ChatFactory',
    '$scope',
    '$window'
  ];

  function AdminChatCtrl (ChatFactory, $scope, $window) {
    var vm = this;
    vm.chat;
    vm.message;

    vm.selectUser = selectUser;
    vm.connect     = connect;
    vm.subscribe   = subscribe;
    vm.onUserMessage = onUserMessage;
    vm.onUserConnection = onUserConnection;
    vm.onUserDisonnection = onUserDisonnection;
    vm.sendMessage = sendMessage;
    
    init();

    function selectUser(user) {
      vm.chat.selected = user.username;
    }

    function connect() {
      ChatFactory.connect(vm.chat.username).then(vm.subscribe, function(error){
        alert(error);
      });
    }

    function disconnect() {
      ChatFactory.disconnect();
    }

    function subscribe() {
      ChatFactory.subscribe('/room/'+vm.chat.username, vm.onUserMessage);
      ChatFactory.subscribe('/client/connect', vm.onUserConnection);
      ChatFactory.subscribe('/client/disconnect', vm.onUserDisonnection);
    }

    function onUserMessage(message) {
      vm.chat.users[message.username].messages.push(message);
      $scope.$apply();
    }

    function onUserConnection(message) {
      vm.chat.users[message.username] = {
        messages : [],
        username : message.username
      }
      $scope.$apply();
    }

    function onUserDisonnection(message) {
      delete vm.chat.users[message.username];
      $scope.$apply();
    }

    function sendMessage() {
      var message = {
        username: vm.chat.username,
        text: vm.message,
        date: new Date()
      }

      ChatFactory.send("/message/"+vm.chat.selected, message);
      vm.chat.users[vm.chat.selected].messages.push(message);
      vm.message = undefined;
    }

    function init() {
      vm.chat = {};
      vm.chat.username = 'admin';
      vm.chat.users = {};

      vm.connect();
      $window.onbeforeunload = vm.disconnect;
    }
  }

})();
