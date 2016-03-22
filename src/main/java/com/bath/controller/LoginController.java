package com.bath.controller;

import com.bath.dto.UserCredentials;
import com.bath.exception.LoginException;
import com.bath.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;

@Controller
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody LoginStatus getStatus() {
        return new LoginStatus(userService.getCurrentUser().getUid(), userService.getCurrentUserRoles());
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody LoginStatus login(
            @RequestBody UserCredentials credentials) {

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        credentials.getUsername(), credentials.getPassword());
        try {
            Authentication auth = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
            userService.synchronize(auth.getName());

            return new LoginStatus(auth.getName(), auth.getAuthorities());

        } catch (BadCredentialsException | InternalAuthenticationServiceException e) {
            throw new LoginException();
        }
    }

    public class LoginStatus {

        private final String username;
        private Collection roles;

        public LoginStatus(String username, Collection roles) {
            this.username = username;
            this.roles = roles;
        }

        public String getUsername() {
            return username;
        }

        public Collection<GrantedAuthority> getRoles() {
            return roles;
        }
    }
}
