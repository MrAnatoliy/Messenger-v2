package com.messenger.messenger.response;

import java.util.List;

import com.messenger.messenger.entity.Contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactsResponse {
    List<Contact> contacts;
}
