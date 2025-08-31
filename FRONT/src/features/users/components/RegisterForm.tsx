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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            Inscription
          </h2>

          {(error || validationError) && (
            <div
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
              role="alert"
            >
              {error || validationError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="votre.email@exemple.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D3803C] focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D3803C] focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D3803C] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-2 px-4 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D3803C] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#D3803C] hover:bg-[#B36E2F] active:bg-[#995C25]"
            }`}
            aria-label={loading ? "Inscription en cours..." : "S'inscrire"}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
