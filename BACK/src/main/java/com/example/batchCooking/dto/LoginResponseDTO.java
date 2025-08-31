package com.example.batchCooking.dto;

import com.example.batchCooking.model.User;

public class LoginResponseDTO {

    private String token;
    private UserDTO user;

    // Constructeurs
    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, User user) {
        this.token = token;
        this.user = new UserDTO(user);
    }

    // Getters / Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    // Classe interne pour les infos utilisateur (sans mot de passe)
    public static class UserDTO {
        private Long id;
        private String email;
        private String createdAt;
        private String updatedAt;

        public UserDTO(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.createdAt = user.getCreatedAt() != null ? user.getCreatedAt().toString() : null;
            this.updatedAt = user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null;
        }

        // Getters / Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getCreatedAt() { return createdAt; }
        public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

        public String getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
    }
}