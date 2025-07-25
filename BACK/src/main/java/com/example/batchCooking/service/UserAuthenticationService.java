package com.example.batchCooking.service;

import com.example.batchCooking.model.User;
import com.example.batchCooking.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserAuthenticationService implements UserDetailsService {

    private final UserRepository userRepository;

    // Injection via constructeur
    public UserAuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Cette méthode est appelée par Spring Security lors de la connexion
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // On cherche l'utilisateur dans la base avec l'email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec email : " + email));

        // On retourne un objet UserDetails que Spring Security va utiliser
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.emptyList()) // pas de rôles pour l'instant, on peut ajouter plus tard
                .build();
    }
}