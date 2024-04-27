package com.messenger.messenger.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.messenger.messenger.entity.ChatMessage;
import com.messenger.messenger.entity.ChatRoom;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long>{
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);
}
