package com.messenger.messenger.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.messenger.messenger.domain.User;
import com.messenger.messenger.entity.ChatRoom;
import com.messenger.messenger.repository.ChatRoomRepository;

@Service
public class ChatRoomService {
    @Autowired private ChatRoomRepository chatRoomRepository;

    public Optional<ChatRoom> getChat(
        User sender, User recipient, boolean createIfNotExist
    ) {
        User firstUser = sender.getId() < recipient.getId() ? sender : recipient;
        User secondUser = sender.getId() > recipient.getId() ? sender : recipient;

        return chatRoomRepository
        .findByFirstUserAndSecondUser(firstUser, secondUser)
        .or(() -> {
            if(!createIfNotExist) return Optional.empty();
            ChatRoom newChatRoom = ChatRoom
                .builder()
                .firstUser(firstUser)
                .secondUser(secondUser)
                .build();
            ChatRoom repositoryChatRoom = chatRoomRepository.save(newChatRoom);
            return Optional.of(repositoryChatRoom);
        });
    }
}
