package com.bath.controller;

import com.bath.dto.UserCredentials;
import com.bath.entity.AverageByBath;
import com.bath.entity.User;
import com.bath.exception.LoginException;
import com.bath.repository.AverageByBathRepository;
import com.bath.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AverageByBathRepository averageByBathRepository;

    @Autowired
    private UserService userService;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody LoginStatus getStatus() {
        List<AverageByBath> all = averageByBathRepository.findAll( new Sort(Sort.Direction.DESC, "bathId"));

        User currentUser = userService.getCurrentUser();
        LoginStatus loginStatus = new LoginStatus();
        loginStatus.setUsername(currentUser != null ? currentUser.getUid() : null);
        loginStatus.setRoles(userService.getCurrentUserRoles());
        return loginStatus;
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody LoginStatus login(
            @RequestBody UserCredentials credentials) {

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword());
        try {
            Authentication auth = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
            userService.synchronize(auth.getName());

            return new LoginStatus(auth.getName(), auth.getAuthorities());

        } catch (BadCredentialsException | InternalAuthenticationServiceException e) {
            throw new LoginException();
        }
    }

    private class LoginStatus {

        private String username;
        private Collection<? extends GrantedAuthority> roles;

        LoginStatus() {}

        LoginStatus(String username, Collection<? extends GrantedAuthority> roles) {
            this.setUsername(username);
            this.setRoles(roles);
        }

        public String getUsername() {
            return username;
        }

        public Collection<? extends GrantedAuthority> getRoles() {
            return roles;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setRoles(Collection<? extends GrantedAuthority> roles) {
            this.roles = roles;
        }

    }
}
