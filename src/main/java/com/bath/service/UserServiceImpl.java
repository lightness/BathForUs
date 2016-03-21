package com.bath.service;

import com.bath.entity.User;
import com.bath.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;


    @Override
    public boolean synchronize(String username) {
        if (username == null || username.equals(""))
            return false;

        User user = userRepository.findByUid(username);
        if (user != null && user.getUid().equals(username))
            return true;
        else
            if (userRepository.save(new User(username)) != null)
                return true;

        return false;
    }

    @Override
    public boolean isAdmin(String username) {
        return false;
    }
}
