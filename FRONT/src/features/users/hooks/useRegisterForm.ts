import { useState } from "react";
import { useAuth, RegisterRequest } from "@/features/users";
import { useNavigate } from "react-router-dom";

type UseRegisterFormProps = {
  onSuccess?: () => void;
};

export function useRegisterForm({ onSuccess }: UseRegisterFormProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (password !== confirmPassword) {
      setValidationError("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 6) {
      setValidationError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const registerData: RegisterRequest = { email, password, confirmPassword };
    const response = await register(registerData);

    if (response) {
      navigate("/");
      if (onSuccess) onSuccess();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    validationError,
    loading,
    error,
    handleSubmit,
  };
}