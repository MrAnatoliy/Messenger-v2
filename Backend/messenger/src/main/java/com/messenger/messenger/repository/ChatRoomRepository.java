package com.messenger.messenger.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.messenger.messenger.domain.User;
import com.messenger.messenger.entity.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {
    Optional<ChatRoom> findByFirstUserAndSecondUser(User firstUser, User secondUser);
}
