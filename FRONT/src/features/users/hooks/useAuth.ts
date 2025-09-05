import { useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@/features/users';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const currentUser = await getCurrentUser(token);
          setUser(currentUser);
        } catch {
          // Token invalide ou autre erreur : on nettoie
          localStorage.removeItem("jwtToken");
          setUser(null);
        }
      }
      setIsInitialized(true);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    setError(null);
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("jwtToken", response.token);
      setUser(response.user);
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
      if (response.user?.token) {
        localStorage.setItem("jwtToken", response.user.token);
        setUser(response.user.user); // Accès correct au User imbriqué
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
    setUser(null);
  };

  const isAuthenticated = (): boolean => {
    return !!user && !!localStorage.getItem("jwtToken");
  };

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    error,
    isInitialized,
    clearError: () => setError(null)
  };
};