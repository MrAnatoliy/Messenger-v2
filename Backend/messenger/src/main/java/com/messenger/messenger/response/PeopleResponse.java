package com.messenger.messenger.response;

import java.util.List;
import com.messenger.messenger.entity.ResponseUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PeopleResponse {
    private List<ResponseUser> contacts;
}
