package com.example.batchCooking.configuration;

import com.example.batchCooking.model.User;
import com.example.batchCooking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                User user = User.builder()
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("admin123"))
                        .build();
                userRepository.save(user);
                System.out.println("✅ Utilisateur admin@example.com créé avec mot de passe : admin123");
            } else {
                System.out.println("ℹ️ Utilisateur déjà existant, aucun ajout effectué.");
            }
        };
    }
}