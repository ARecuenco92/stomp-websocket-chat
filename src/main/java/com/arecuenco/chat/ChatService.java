package com.arecuenco.chat;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

	private static final String CHAT_ADMIN_USERNAME = "admin";

	@Autowired
	private SimpMessagingTemplate template;

	private Map<String, String> sessions;

	private String adminSessionId;

	public ChatService() {
		sessions = new HashMap<String, String>();
		adminSessionId = null;
	}

	public void afterConnect(String sessionId, String username) {
		ChatMessage msg = new ChatMessage();
		msg.setUsername(username);

		if (username.equals(CHAT_ADMIN_USERNAME)) {
			adminSessionId = sessionId;
			template.convertAndSend("/admin/connect", msg);
		} else {
			template.convertAndSend("/client/connect", msg);
		}

		storeUsername(sessionId, username);
	}

	public void afterDisconnect(String sessionId) {
		String username = removeUsername(sessionId);
		ChatMessage msg = new ChatMessage();
		msg.setUsername(username);

		if (username != null && username.equals(CHAT_ADMIN_USERNAME)) {
			adminSessionId = null;
			template.convertAndSend("/admin/disconnect", msg);
		} else {
			template.convertAndSend("/client/disconnect", msg);
		}
	}

	public void afterSubscribe(String sessionId, String topic) {
		String username = getUsername(sessionId);
		ChatMessage msg = new ChatMessage();
		msg.setUsername(username);

		if (username.equals(CHAT_ADMIN_USERNAME) && topic.equals("/client/connect")) {
			sendConnectedUsers();
		} else if (adminSessionId != null && topic.equals("/admin/connect")) {
			template.convertAndSend("/admin/connect", msg);
		} else if (adminSessionId == null && topic.equals("/admin/disconnect")) {
			template.convertAndSend("/admin/disconnect", msg);
		}
	}

	private void sendConnectedUsers() {
		ChatMessage msg = new ChatMessage();
		for (Map.Entry<String, String> entry : sessions.entrySet()) {
			if (entry.getKey() != adminSessionId) {
				msg.setUsername(entry.getValue());
				template.convertAndSend("/client/connect", msg);
			}
		}
	}

	private String getUsername(String sessionId) {
		return sessions.get(sessionId);
	}

	private String removeUsername(String sessionId) {
		return sessions.remove(sessionId);
	}

	private void storeUsername(String sessionId, String username) {
		sessions.put(sessionId, username);
	}
}
