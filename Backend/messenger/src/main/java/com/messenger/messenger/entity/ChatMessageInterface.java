package com.messenger.messenger.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageInterface {
    Long senderId;
    Long recipientId;
    String time;
    String content;
    String status;    
}
