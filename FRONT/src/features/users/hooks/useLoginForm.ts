import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/users";

type UseLoginFormProps = {
  onSuccess?: () => void;
};

// Fonction sécurisée pour traduire les erreurs en messages utilisateurs
const getErrorMessage = (error: any): string => {
  if (typeof error === 'string' && !error.includes('HTTP')) {
    return error;
  }

  if (error?.response?.status || error?.status) {
    const status = error.response?.status || error.status;

    switch (status) {
      case 400:
        return 'Informations de connexion invalides';
      case 401:
      case 403:
        return 'Email ou mot de passe incorrect';
      case 404:
        return 'Service de connexion indisponible';
      case 429:
        return 'Trop de tentatives. Réessayez dans quelques minutes';
      case 422:
        return 'Format des données incorrect';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'Service temporairement indisponible. Réessayez plus tard';
      default:
        return 'Une erreur est survenue lors de la connexion';
    }
  }

  if (error?.message) {
    if (error.message.includes('Network Error') || error.message.includes('fetch')) {
      return 'Problème de connexion internet';
    }
    if (error.message.includes('timeout')) {
      return 'Délai de connexion dépassé. Réessayez';
    }
  }

  return 'Une erreur est survenue. Réessayez';
};

// Validation côté client du formulaire login
const validateLoginForm = (email: string, password: string): string[] => {
  const errors: string[] = [];

  if (!email.trim()) {
    errors.push('Email requis');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Format d\'email invalide');
    }
  }

  if (!password.trim()) {
    errors.push('Mot de passe requis');
  } else if (password.length < 6) {
    errors.push('Mot de passe trop court (minimum 6 caractères)');
  }

  return errors;
};

export function useLoginForm({ onSuccess }: UseLoginFormProps = {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation côté client
    const validationErrors = validateLoginForm(email, password);
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const success = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (success) {
        setError(null);
        onSuccess?.();
        navigate(from, { replace: true });
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur de connexion détaillée:', err);
      }
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
