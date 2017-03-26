# Chat service over WebSocket

The aim of the project is to develop a support chat module to help consumers in real time. 

The application contains a responsive single page application with a chat module that allows consumers to chat with the application administrator in real time. Additionally, the application contains an administrator section to display the connected users and their chats.

Finally, the chat module is in a different view. Therefore, it is possible to configure in which sections should be appear. For example, the blog section does not display this chat. 

## Requirements to build the application

* Java SE Development Kit 1.8 or later
* Apache Maven 3.0+


## Build and run
* Download the repository with the source code using git:

`git clone https://github.com/ARecuenco92/stomp-websocket-chat.git`

* Compile the source code, run tests, and package the code up in a JAR file with Maven:

`mvn package`

* Execute the application and the embedded Server will start and listen on port 8080:

`java -jar target/stomp-websocket-chat-0.0.1-SNAPSHOT.jar`

* Open a browser and navigate to http:localhost:8080 

* **Start to chat!**

## Software frameworks/libraries

### Server side

* **Apache Maven**: Apache Maven is a software project management and comprehension tool. Based on the concept of a project object model (POM), Maven can manage a project's build, reporting and documentation from a central piece of information.

	Reference: [Apache Maven](https://maven.apache.org/)

* **Spring Boot**: is an application framework for the Java platform that provides extensions for building web applications on top of the Java EE platform.

	Reference: [Spring Boot](https://projects.spring.io/spring-boot/)

### Client side

* **Angular JS**: AngularJS is a JavaScript front-end web application framework to develop single page applications. It provides a framework for client side model–view–controller (MVC).

	Reference: [Angular JS](https://angularjs.org/)

* **Bootstrap**: Bootstrap is a front-end web framework for designing responsive websites and web applications.

	Reference: [Bootstrap](http://getbootstrap.com/)

* **jQuery**: jQuery is a JavaScript library that makes HTML document traversal and manipulation, event handling, animations much simpler. 

	Reference: [jQuery](https://jquery.com/)

* **sockjs-client**: SockJS is a browser JavaScript library that provides a WebSocket-like object. SockJS gives you a coherent, cross-browser, Javascript API which creates a low latency, full duplex, cross-domain communication channel between the browser and the web server. 

	Reference: [sockjs-client](https://github.com/sockjs/sockjs-client)

* **stomp-websocket**: STOMP.js is a browser JavaScript library that provides  STOMP client for Web browser (using Web Sockets). 

	Reference: [stomp-websocket](https://github.com/jmesnil/stomp-websocket)

## References

* [Using WebSocket to build an interactive web application](https://spring.io/guides/gs/messaging-stomp-websocket/)