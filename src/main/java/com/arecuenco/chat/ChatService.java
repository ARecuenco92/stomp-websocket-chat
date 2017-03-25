package com.arecuenco.chat;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

	@Value("${chat.admin_username}")
	private static String CHAT_ADMIN_USERNAME;

	@Autowired
	private SimpMessagingTemplate template;

	private Map<String, String> sessions;

	public ChatService() {
		sessions = new HashMap<String, String>();
	}

	public void connect(String sessionId, String username) {
		ChatMessage msg = new ChatMessage();
		msg.setUsername(username);
		if (username.equals(CHAT_ADMIN_USERNAME)) {
			template.convertAndSend("/admin/connect", msg);
		} else {
			template.convertAndSend("/client/connect", msg);
		}

		storeUsername(sessionId, username);
	}

	public void disconnect(String sessionId) {
		String username = getUsername(sessionId);
		ChatMessage msg = new ChatMessage();
		msg.setUsername(username);
		if (username.equals(CHAT_ADMIN_USERNAME)) {
			template.convertAndSend("/admin/disconnect", msg);
		} else {
			template.convertAndSend("/client/disconnect", msg);
		}
	}

	private String getUsername(String sessionId) {
		return sessions.get(sessionId);
	}

	private void storeUsername(String sessionId, String username) {
		sessions.put(sessionId, username);
	}
}
