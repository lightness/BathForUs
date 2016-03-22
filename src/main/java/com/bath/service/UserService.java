package com.bath.service;

import com.bath.entity.User;

import java.util.List;

public interface UserService {

    boolean synchronize(String username);

    boolean isAdmin(String username);

    User getCurrentUser();

    List<String> getCurrentUserRoles();

}
