package com.bath.controller;

import com.bath.dto.UserCredentials;
import com.bath.exception.LoginException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@Controller
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody LoginStatus getStatus() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return new LoginStatus(auth.getName(), auth.getAuthorities());
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

            return new LoginStatus(auth.getName(), auth.getAuthorities());

        } catch(BadCredentialsException | InternalAuthenticationServiceException e) {
            throw new LoginException();
        }
    }
/*
    @RequestMapping(value = "?logout", method = RequestMethod.POST)
    public @ResponseBody LoginStatus logout(
            HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        //return new LoginStatus(auth.isAuthenticated(), "sdfasdf");
        return new LoginStatus(auth.getName(), auth.getAuthorities());
    }
*/
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
