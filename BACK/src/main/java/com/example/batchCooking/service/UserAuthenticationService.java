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

    // Méthode appelée par Spring Security lors de la connexion
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Recherche de l'utilisateur dans la base avec l'email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec email : " + email));

        // Retourne un objet UserDetails que Spring Security va utiliser
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.emptyList()) // TODO : pour l'instant pas de rôles, à ajouter plus tard ?
                 .build();
    }
}