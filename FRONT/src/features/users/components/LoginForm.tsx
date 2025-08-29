import React from "react";
import { Link } from "react-router-dom";
import { useLoginForm } from "@/features/users";

type LoginFormProps = {
  onSuccess?: () => void;
};

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm({ onSuccess });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          role="form"
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            Connexion
          </h2>

          {error && (
            <div
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3803C] focus:border-transparent transition-colors"
                required
                autoComplete="username"
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D3803C] focus:border-transparent transition-colors"
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-2 px-4 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D3803C] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#D3803C] hover:bg-[#B36E2F] active:bg-[#995c25]"
            }`}
            aria-label={loading ? "Connexion en cours..." : "Se connecter"}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Vous découvrez BatchCooking ?
            </p>
            <Link
              to="/register"
              className="text-[#D3803C] hover:text-[#B36E2F] text-sm font-medium hover:underline transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
