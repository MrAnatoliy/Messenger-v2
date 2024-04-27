package com.messenger.messenger.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.DateOperators.IsoDateFromParts;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.messenger.messenger.domain.User;
import com.messenger.messenger.entity.ChatMessage;
import com.messenger.messenger.entity.ChatMessageInterface;
import com.messenger.messenger.entity.ChatMessageResponse;
import com.messenger.messenger.entity.ChatNotification;
import com.messenger.messenger.entity.ChatRoom;
import com.messenger.messenger.entity.Contact;
import com.messenger.messenger.entity.MessageStatus;
import com.messenger.messenger.entity.ResponseUser;
import com.messenger.messenger.repository.ChatMessageRepository;
import com.messenger.messenger.response.PeopleResponse;
import com.messenger.messenger.response.ContactsResponse;
import com.messenger.messenger.response.MessagesResponse;
import com.messenger.messenger.service.ChatMessageService;
import com.messenger.messenger.service.ChatRoomService;
import com.messenger.messenger.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@Controller
@RestController
@RequestMapping("api/chat")
public class ChatController {
    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private ChatRoomService chatRoomService;
    @Autowired private ChatMessageService chatMessageService;
    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private UserService userService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessageInterface chatMessage){

        User sender = userService.findUserById(chatMessage.getSenderId());
        User recipient = userService.findUserById(chatMessage.getRecipientId());

        ChatRoom repositoryChatRoom = chatRoomService.getChat
        (
            sender,
            recipient,
            true
        )
            .orElse(null
        );

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");

        ChatMessage parsedMessage = null;
        try {
            parsedMessage = ChatMessage
            .builder()
            .sender(sender)
            .recipient(recipient)
            .message(chatMessage.getContent())
            .timestamp(dateFormat.parse(chatMessage.getTime()))
            .status(MessageStatus.DELIVERED)
            .build();
        } catch (ParseException e) {
            System.err.print("Failed to parse date string");
            e.printStackTrace();
        }

        parsedMessage.setChatRoom(repositoryChatRoom);
        ChatMessage savedChatMessage = chatMessageService.save(parsedMessage);
        messagingTemplate.convertAndSendToUser
        (
            chatMessage.getRecipientId().toString(),"/queue/messages",
            new ChatNotification(
                savedChatMessage.getSender().getId(),
                savedChatMessage.getSender().getUserLogin(),
                savedChatMessage.getMessage()
            )
        );

        messagingTemplate.convertAndSendToUser
        (
            chatMessage.getSenderId().toString(),"/queue/messageResponse",
            new ChatMessageResponse(
                savedChatMessage.getMessage()
            )
        );
    }
    
    @GetMapping("/messages/{firstUserId}/{secondUserId}")
    public ResponseEntity<MessagesResponse> getMessages(@PathVariable Long firstUserId, @PathVariable Long secondUserId) {
        User firstUser = userService.findUserById(firstUserId);
        User secondUser = userService.findUserById(secondUserId);
        ChatRoom chatRoom = chatRoomService.getChat(firstUser, secondUser, true).orElse(null);
        List<ChatMessage> messages = chatMessageRepository.findByChatRoom(chatRoom);
        MessagesResponse response = MessagesResponse
            .builder()
            .firstUser(firstUser)
            .secondUser(secondUser)
            .messages(messages)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/people")
    public ResponseEntity<PeopleResponse> getAllPeople() {
        List<User> users = userService.allUsers();
        List<ResponseUser> responseUsers = users.stream().map(user -> new ResponseUser(user)).toList();
        return ResponseEntity.ok(new PeopleResponse(responseUsers));
    }
    
    @GetMapping("/messages/{userId}")
    public ResponseEntity<ContactsResponse> getUserContacts(@PathVariable Long userId) {
        List<Contact> contacts = new ArrayList<>();

        User user = userService.findUserById(userId);
        List<User> userContactsList = user.getContacts();  
        userContactsList.stream().forEach(userContact -> {
            List<ChatMessage> messages = chatMessageService.getMessagesByChatRoom(user, userContact);
            List<ChatMessageInterface> messageInterfaces = messages.stream().map(message -> 
                ChatMessageInterface
                    .builder()
                    .senderId(message.getSender().getId())
                    .recipientId(message.getRecipient().getId())
                    .time(message.getTimestamp().toString())
                    .content(message.getMessage())
                    .status(message.getStatus().toString())
                    .build()
            ).toList();
            if(messages != null) {
                contacts.add(Contact
                .builder()
                .contact(new ResponseUser(userContact))
                .messages(messageInterfaces)
                .build()
                );
            }
        });

        return ResponseEntity.ok(new ContactsResponse(contacts));
    }

    @PostMapping("/people/{toContactUserId}")
    public ResponseEntity<PeopleResponse> addToContact(@PathVariable Long toContactUserId) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User toContactUser = userService.findUserById(toContactUserId);
        List<User> newContacts = userService.addContact(user, toContactUser);
        if(newContacts == null) return ResponseEntity.badRequest().body(new PeopleResponse(null));
        List<ResponseUser> responseContacts = newContacts.stream().map(contact -> new ResponseUser(toContactUser)).toList();

        return ResponseEntity.ok(new PeopleResponse(responseContacts));
    }
    
    
}
