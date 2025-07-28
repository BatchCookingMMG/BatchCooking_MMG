package com.example.batchCooking.controller;

import com.example.batchCooking.model.User;
import com.example.batchCooking.security.JwtTokenProvider;
import com.example.batchCooking.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerUnitTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @Test
    void getCurrentUser_authenticationNull_returnsUnauthorized() {
        // Given
        try (MockedStatic<SecurityContextHolder> mockedSecurityContext = mockStatic(SecurityContextHolder.class)) {
            SecurityContext securityContext = mock(SecurityContext.class);
            when(securityContext.getAuthentication()).thenReturn(null);
            mockedSecurityContext.when(SecurityContextHolder::getContext).thenReturn(securityContext);

            // When
            ResponseEntity<?> response = authController.getCurrentUser();

            // Then
            assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
            assertEquals("Non authentifié", response.getBody());
        }
    }

    @Test
    void getCurrentUser_notAuthenticated_returnsUnauthorized() {
        // Given
        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(false);

        try (MockedStatic<SecurityContextHolder> mockedSecurityContext = mockStatic(SecurityContextHolder.class)) {
            SecurityContext securityContext = mock(SecurityContext.class);
            when(securityContext.getAuthentication()).thenReturn(auth);
            mockedSecurityContext.when(SecurityContextHolder::getContext).thenReturn(securityContext);

            // When
            ResponseEntity<?> response = authController.getCurrentUser();

            // Then
            assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
            assertEquals("Non authentifié", response.getBody());
        }
    }

    @Test
    void getCurrentUser_userNotFoundInDatabase_returnsNotFound() {
        // Given
        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getName()).thenReturn("test@example.com");
        when(userService.findByEmail("test@example.com")).thenReturn(Optional.empty());

        try (MockedStatic<SecurityContextHolder> mockedSecurityContext = mockStatic(SecurityContextHolder.class)) {
            SecurityContext securityContext = mock(SecurityContext.class);
            when(securityContext.getAuthentication()).thenReturn(auth);
            mockedSecurityContext.when(SecurityContextHolder::getContext).thenReturn(securityContext);

            // When
            ResponseEntity<?> response = authController.getCurrentUser();

            // Then
            assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
            assertEquals("Utilisateur non trouvé", response.getBody());
            verify(userService).findByEmail("test@example.com");
        }
    }

    @Test
    void getCurrentUser_validAuthentication_returnsUser() {
        // Given
        User mockUser = new User();
        mockUser.setEmail("test@example.com");

        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getName()).thenReturn("test@example.com");
        when(userService.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

        try (MockedStatic<SecurityContextHolder> mockedSecurityContext = mockStatic(SecurityContextHolder.class)) {
            SecurityContext securityContext = mock(SecurityContext.class);
            when(securityContext.getAuthentication()).thenReturn(auth);
            mockedSecurityContext.when(SecurityContextHolder::getContext).thenReturn(securityContext);

            // When
            ResponseEntity<?> response = authController.getCurrentUser();

            // Then
            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(mockUser, response.getBody());
            verify(userService).findByEmail("test@example.com");
        }
    }
}