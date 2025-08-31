package com.example.batchCooking.controller;

import com.example.batchCooking.dto.LoginRequestDTO;
import com.example.batchCooking.dto.RegisterRequestDTO;
import com.example.batchCooking.model.User;
import com.example.batchCooking.repository.UserRepository;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.batchCooking.security.JwtTokenProvider;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;  // injection de l'encodeur

    @BeforeEach
    void setup() {
        userRepository.deleteAll();
    }

    @Test
    void testRegister_thenLogin() throws Exception {
        RegisterRequestDTO registerRequest = new RegisterRequestDTO();
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setConfirmPassword("password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Utilisateur créé avec succès"));

        User user = userRepository.findByEmail("test@example.com").orElse(null);
        assertNotNull(user);

        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.email").value("test@example.com"));
    }

    @Test
    void testRegister_fail_passwordMismatch() throws Exception {
        RegisterRequestDTO registerRequest = new RegisterRequestDTO();
        registerRequest.setEmail("fail@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setConfirmPassword("wrongPassword");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Les mots de passe ne correspondent pas"));
    }

    @Test
    void testRegister_fail_emailAlreadyUsed() throws Exception {
        // Créer un utilisateur en base
        User user = new User();
        user.setEmail("used@example.com");
        user.setPassword(passwordEncoder.encode("somePassword"));
        userRepository.save(user);

        RegisterRequestDTO registerRequest = new RegisterRequestDTO();
        registerRequest.setEmail("used@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setConfirmPassword("password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email déjà utilisé"));
    }

    @Test
    void testLogin_fail_badCredentials() throws Exception {
        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword(passwordEncoder.encode("correctPassword"));
        userRepository.save(user);

        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail("user@example.com");
        loginRequest.setPassword("wrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Email ou mot de passe incorrect"));
    }

    @Test
    public void testGetCurrentUser_success() throws Exception {
        // 1. Créer un utilisateur factice
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password"); // Selon si tu utilises un encodeur, adapte ce mot de passe

        // 2. Sauvegarder cet utilisateur dans la base de données (méthode réelle de userService)
        userRepository.save(user);

        // 3. Générer un token JWT valide pour cet utilisateur
        String token = tokenProvider.generateToken(user.getEmail());

        // 4. Effectuer la requête GET /api/auth/me avec le token dans l'en-tête Authorization
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())                              // Vérifier code HTTP 200
                .andExpect(jsonPath("$.email").value("test@example.com"));  // Vérifier que le JSON contient l'email attendu
    }

    @Test
    void testGetCurrentUser_noToken_forbidden() throws Exception {
        // Cas 1: Aucun token fourni -> 403 Forbidden
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isForbidden());
    }

    @Test
    void testGetCurrentUser_invalidToken_forbidden() throws Exception {
        // Cas 2: Token invalide fourni -> 403 Forbidden (pas 401 !)
        // Spring Security bloque avant votre validation JWT
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer token-invalide"))
                .andExpect(status().isForbidden()); // Changé de isUnauthorized() à isForbidden()
    }

    @Test
    void testGetCurrentUser_malformedToken_forbidden() throws Exception {
        // Cas 3: Token mal formé -> 403 Forbidden (pas 401 !)
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer"))
                .andExpect(status().isForbidden()); // Changé de isUnauthorized() à isForbidden()
    }
}
