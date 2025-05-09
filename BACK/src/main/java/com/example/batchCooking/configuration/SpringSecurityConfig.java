package com.example.batchCooking.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Désactive CSRF (inutile si pas de formulaire de login)
                .csrf(AbstractHttpConfigurer::disable)
                // Dit à Spring de n’utiliser **aucune** session
                .sessionManagement(AbstractHttpConfigurer::disable)
                // Autorise **toutes** les requêtes, sans authentification
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );
        return http.build();
    }

}
