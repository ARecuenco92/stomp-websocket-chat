package com.arecuenco.chat;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

	@MessageMapping("/message/{name}")
	@SendTo("/room/{name}")
	public ChatMessage sendMessage(@DestinationVariable String name, ChatMessage message) throws Exception {
		return message;
	}

}
