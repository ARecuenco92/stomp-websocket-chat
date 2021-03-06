package com.arecuenco.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;

import com.arecuenco.chat.ChatService;

public class ChannelInterceptor extends ChannelInterceptorAdapter {

	@Autowired
	private ChatService service;

	@Override
	public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception e) {
		StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
		StompCommand command = sha.getCommand();
		List<String> username = sha.getNativeHeader("username");
		String sessionId = sha.getSessionId();

		if (!IsHeartbeatCommand(command) && sent && e == null) {
			switch (command) {
			case CONNECT:
				service.afterConnect(sessionId, username.get(0));
				break;
			case DISCONNECT:
				service.afterDisconnect(sessionId);
				break;
			case SUBSCRIBE:
				sleep(500);
				service.afterSubscribe(sessionId, sha.getDestination());
				break;
			default:
				break;
			}
		}
	}

	private boolean IsHeartbeatCommand(StompCommand command) {
		return command == null;
	}

	private void sleep(int milis) {
		try {
			Thread.sleep(milis);
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}
	}
}
