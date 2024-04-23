package com.messenger.messenger.response;

import java.util.List;

import com.messenger.messenger.domain.User;
import com.messenger.messenger.entity.ChatMessage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessagesResponse {
    User firstUser;
    User secondUser;
    List<ChatMessage> messages;
}
