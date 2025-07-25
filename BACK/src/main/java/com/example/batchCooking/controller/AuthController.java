package com.example.batchCooking.controller;

import com.example.batchCooking.dto.LoginRequestDTO;
import com.example.batchCooking.dto.LoginResponseDTO;
import com.example.batchCooking.dto.RegisterRequestDTO; // Import ajouté
import com.example.batchCooking.model.User;
import com.example.batchCooking.security.JwtTokenProvider;
import com.example.batchCooking.service.UserService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider tokenProvider,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            // Authentification avec Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Récupérer l'utilisateur authentifié
            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            // Générer le token JWT
            String token = tokenProvider.generateToken(loginRequest.getEmail());

            // Créer la réponse avec token et infos utilisateur
            LoginResponseDTO response = new LoginResponseDTO(token, user);

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Email ou mot de passe incorrect");
            errorResponse.put("status", HttpStatus.UNAUTHORIZED.value());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDTO registerRequest) {

        // Vérifier si les mots de passe correspondent
        if (!registerRequest.isPasswordMatching()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Les mots de passe ne correspondent pas");
            errorResponse.put("field", "confirmPassword");
            errorResponse.put("status", HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Vérifier si l'email existe déjà
        if (userService.findByEmail(registerRequest.getEmail()).isPresent()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Email déjà utilisé");
            errorResponse.put("field", "email");
            errorResponse.put("status", HttpStatus.BAD_REQUEST.value());

            return ResponseEntity.badRequest().body(errorResponse);
        }

        try {
            // Créer et sauvegarder le nouvel utilisateur
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword()); // sera encodé dans userService.save()

            User savedUser = userService.save(user);

            // Générer un token pour l'utilisateur nouvellement créé
            String token = tokenProvider.generateToken(savedUser.getEmail());

            // Retourner la réponse avec token et infos utilisateur
            LoginResponseDTO response = new LoginResponseDTO(token, savedUser);

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("message", "Utilisateur créé avec succès");
            successResponse.put("user", response);
            successResponse.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Erreur lors de la création de l'utilisateur");
            errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}