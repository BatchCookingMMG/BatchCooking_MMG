import { useState } from "react";
import { LoginRequest, useAuth } from "@/features/users";
import { useNavigate } from "react-router-dom";

type UseLoginFormProps = {
  onSuccess?: () => void;
};

export function useLoginForm({ onSuccess }: UseLoginFormProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials: LoginRequest = { email, password };
    const response = await login(credentials);

    if (response) {
      navigate("/");
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}