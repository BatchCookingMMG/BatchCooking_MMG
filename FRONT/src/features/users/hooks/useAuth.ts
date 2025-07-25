import { useState } from 'react';
import { loginUser } from '@/features/users/api/authApi';
import { LoginRequest, LoginResponse } from '@/features/users/types/userTypes';

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

  const logout = () => {
    localStorage.removeItem("jwtToken");
    // Autres actions de déconnexion si nécessaire
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("jwtToken");
  };

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error,
    clearError: () => setError(null)
  };
};