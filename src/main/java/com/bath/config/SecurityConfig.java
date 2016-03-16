package com.bath.config;


import com.bath.util.LdapUserAuthoritiesPopulator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationManagerBuilder auth;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                //.antMatchers("/static/**").permitAll()
                //.anyRequest().authenticated()
                .and()
                .csrf().disable()
                .logout();
    }

    @Autowired
    public void configureGlobal(
            AuthenticationManagerBuilder auth) throws Exception {
        auth
                .ldapAuthentication()
                .ldapAuthoritiesPopulator(ldapAuthoritiesPopulator())
                .userSearchFilter("(uid={0})").userSearchBase("ou=people")
                .contextSource()
                .url("ldap://ldap-brs1.ericpol.int:389/dc=ericpol,dc=int");

                /* Uncomment the code below for testing purposes */
                /* Available users are: boyle, cuire, einstein, euclid,
                                        euler, galileo, gauss, newton,
                                        nobel, pasteur, riemann, tesla
                   The password for all test users is "password"
                 */
                /*
                    .userSearchFilter("(uid={0})")
                    .contextSource()
                    .url("ldap://ldap.forumsys.com:389/dc=example,dc=com");
                */
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return auth.build();
    }

    @Bean
    public LdapUserAuthoritiesPopulator ldapAuthoritiesPopulator() {
        return new LdapUserAuthoritiesPopulator();
    }

}