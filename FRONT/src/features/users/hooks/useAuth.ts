import { useState } from 'react';
import { loginUser, registerUser } from '@/features/users/api/authApi';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/features/users/types/userTypes';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(credentials);
      
      // Stocker le token
      localStorage.setItem("jwtToken", response.token);
      console.log("Connexion réussie");
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la connexion";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<RegisterResponse | null> => {
    setError(null);
    setLoading(true);

    try {
      const response = await registerUser(userData);
      
      // Stocker le token (votre backend renvoie un token lors de l'inscription)
      if (response.user?.token) {
        localStorage.setItem("jwtToken", response.user.token);
        console.log("Inscription réussie");
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de l'inscription";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    // Autres actions de déconnexion si nécessaire
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("jwtToken");
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    error,
    clearError: () => setError(null)
  };
};