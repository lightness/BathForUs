package com.bath.service;

import com.bath.entity.User;
import com.bath.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;


    @Override
    public boolean synchronize(String username) {
        if (username == null || username.equals(""))
            return false;

        User user = userRepository.findByUid(username);
        if (user == null)
            userRepository.save(new User(username));

        return true;
    }

    @Override
    public boolean isAdmin(String username) {
        return false;
    }

    @Override
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUid(auth.getName());
    }

    @Override
    public Collection<? extends GrantedAuthority> getCurrentUserRoles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities();
    }
}
