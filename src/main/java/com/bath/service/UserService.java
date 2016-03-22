package com.bath.service;

import com.bath.entity.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public interface UserService {

    boolean synchronize(String username);

    boolean isAdmin(String username);

    User getCurrentUser();

    Collection<? extends GrantedAuthority> getCurrentUserRoles();

}
