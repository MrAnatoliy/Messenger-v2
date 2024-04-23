package com.messenger.messenger.service;

import com.messenger.messenger.domain.*;
import com.messenger.messenger.request.AuthenticationRequest;
import com.messenger.messenger.request.RegisterRequest;
import com.messenger.messenger.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        var password = passwordEncoder.encode(request.getPassword());
        var user = User.builder()
                .email(request.getEmail())
                .userLogin(request.getUserLogin())
                .password(password)
                .prevPassword(password)
                .build();
        userService.saveUser(user);
        var currentUser = userService.findUserByEmail(user.getEmail());
        userService.addRoleToUser(currentUser, "ROLE_USER");
        var jwtToken = jwtService.generateToken(user);
        Set<String> strRoles = new HashSet<>();
        user.getRoles().forEach(r -> strRoles.add(r.getName()));
        return AuthenticationResponse.builder()
                .id(currentUser.getId())
                .token(jwtToken)
                .roles(strRoles)
                .userLogin(user.getUserLogin())
                .message("OK")
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            var user = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            var authenticatedUser = (UserDetails) user.getPrincipal();
            var roles = userService.findUserByEmail(
                    ((UserDetails) user.getPrincipal()).getUsername()
            ).getRoles();
            Set<String> strRoles = new HashSet<>();
            User userData = userService.findUserByEmail(authenticatedUser.getUsername());
            String userLogin = userData.getUserLogin();
            Long userID = userData.getId();
            roles.forEach(r -> strRoles.add(r.getName()));
            var jwtToken = jwtService.generateToken(authenticatedUser);
            return AuthenticationResponse.builder()
                    .id(userID)
                    .token(jwtToken)
                    .roles(strRoles)
                    .userLogin(userLogin)
                    .message("OK")
                    .build();
        } catch (BadCredentialsException ex) {
            // Handle incorrect password case
            return AuthenticationResponse.builder()
                    .message("Incorrect email or password : " + ex.getMessage())
                    .build();
        }
    }


}
