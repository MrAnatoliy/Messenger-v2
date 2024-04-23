package com.messenger.messenger.response;

import java.util.List;
import com.messenger.messenger.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PeopleResponse {
    private List<User> contacts;
}
