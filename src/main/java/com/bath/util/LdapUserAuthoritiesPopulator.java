package com.bath.util;


import com.bath.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;

import java.util.*;

public class LdapUserAuthoritiesPopulator implements LdapAuthoritiesPopulator {

    @Autowired
    private UserService userService;

    private String rolePrefix = "ROLE_";

    @Override
    public Collection<? extends GrantedAuthority>
        getGrantedAuthorities(DirContextOperations userData, String username) {

        Set<GrantedAuthority> authorities = new HashSet<>();

        String role = (userService != null && userService.isAdmin(username))
                        ? "ADMIN" : "USER";

        authorities.add(new SimpleGrantedAuthority(rolePrefix + role));

        return authorities;
    }
}
