package com.messenger.messenger.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.messenger.messenger.domain.User;
import com.messenger.messenger.entity.ChatMessage;
import com.messenger.messenger.entity.ChatRoom;
import com.messenger.messenger.entity.MessageStatus;
import com.messenger.messenger.repository.ChatMessageRepository;

@Service
public class ChatMessageService {
    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage){
        chatMessage.setStatus(MessageStatus.DELIVERED);
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    public List<ChatMessage> getMessagesByChatRoom(User sender, User recipient) {
        ChatRoom repositoryChatRoom = chatRoomService.getChat(sender, recipient, true).orElse(null);
        if(repositoryChatRoom == null) return null;
        return chatMessageRepository.findByChatRoom(repositoryChatRoom);
    }
}
