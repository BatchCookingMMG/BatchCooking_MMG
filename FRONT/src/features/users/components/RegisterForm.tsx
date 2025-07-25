import React, { useState, FormEvent } from "react";
import { useAuth } from "@/features/users/hooks/useAuth";
import { RegisterRequest } from "@/features/users/types/userTypes";

type RegisterFormProps = {
  onSuccess?: () => void; // Callback optionnel après inscription réussie
};

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation côté client
    setValidationError("");

    if (password !== confirmPassword) {
      setValidationError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setValidationError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const registerData: RegisterRequest = {
      email,
      password,
      confirmPassword,
    };

    const response = await register(registerData);

    if (response && onSuccess) {
      onSuccess(); // Redirection ou autre action après succès
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Inscription</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}

      <div>
        <label htmlFor="register-email">Email :</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </div>

      <div>
        <label htmlFor="register-password">Mot de passe :</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="confirm-password">Confirmer le mot de passe :</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </button>
    </form>
  );
};

export default RegisterForm;
