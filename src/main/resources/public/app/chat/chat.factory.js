(function () {

  'use strict';

  angular
    .module('app.chat')
    .factory('ChatFactory', ChatFactory);

  ChatFactory.$inject = [
    '$q'
  ];

  function ChatFactory($q) {
    var stompClient;

    var factory = {
      connect: connect,
      disconnect: disconnect,
      send: send,
      subscribe: subscribe
    };

    return factory;

    ////////

    function connect(username) {
      return $q(function(resolve, reject) {
        var socket = new SockJS('/chat');
        stompClient = Stomp.over(socket);
        stompClient.connect({'username': username}, function (frame) {
          resolve();
        }, function(error){
          reject(error);
        });
      });
    }

    function disconnect() {
      if (stompClient != null) {
        stompClient.disconnect();
      }
    }

    function subscribe(topic, callback) {
      stompClient.subscribe(topic, function(message){
        console.log(message);
        var body = JSON.parse(message.body)
        callback(body);
      });
    }

    function send(topic, message) {
      stompClient.send(topic, {}, JSON.stringify(message));
    }

    
  }

})();
