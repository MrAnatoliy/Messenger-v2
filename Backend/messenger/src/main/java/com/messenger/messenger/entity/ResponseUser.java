package com.messenger.messenger.entity;

import com.messenger.messenger.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseUser {
    private Long id;
    private String email;
    private String userLogin;

    public ResponseUser(User user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.userLogin = user.getUserLogin();
    }
}
