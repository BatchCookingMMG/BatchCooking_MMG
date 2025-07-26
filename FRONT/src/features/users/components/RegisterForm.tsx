import React from "react";
import { useRegisterForm } from "@/features/users";

type RegisterFormProps = {
  onSuccess?: () => void;
};

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const {
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
  } = useRegisterForm({ onSuccess });

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
