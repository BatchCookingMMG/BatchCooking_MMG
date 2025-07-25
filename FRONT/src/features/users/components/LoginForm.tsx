import React, { useState, FormEvent } from "react";
import { useAuth } from "@/features/users/hooks/useAuth";
import { LoginRequest } from "@/features/users/types/userTypes";

type LoginFormProps = {
  onSuccess?: () => void; // Callback optionnel après connexion réussie
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const credentials: LoginRequest = { email, password };
    const response = await login(credentials);

    if (response && onSuccess) {
      onSuccess(); // Redirection ou autre action après succès
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Connexion</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </div>

      <div>
        <label htmlFor="password">Mot de passe :</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
};

export default LoginForm;
