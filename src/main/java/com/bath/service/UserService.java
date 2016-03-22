package com.bath.service;

public interface UserService {
    boolean synchronize(String username);

    boolean isAdmin(String username);
}
