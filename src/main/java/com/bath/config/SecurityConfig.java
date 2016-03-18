package com.bath.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationManagerBuilder auth;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/**").permitAll()
                    //.antMatchers("/static/**").permitAll()
                    //.antMatchers("/login").permitAll()
                    //.anyRequest().authenticated()
                .and()
                    .csrf().disable();
    }

    @Autowired
    public void configureGlobal(
            AuthenticationManagerBuilder auth) throws Exception {
        auth
                .ldapAuthentication()
                    .userDnPatterns("uid={0}")
                    .contextSource()
                    .url("ldap://ldap-brs1.ericpol.int:389/ou=people,dc=ericpol,dc=int")
                .and()
                    .passwordCompare()
                        .passwordAttribute("userPassword");
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return auth.build();
    }

}
