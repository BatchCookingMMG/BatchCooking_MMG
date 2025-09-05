import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCurrentUser, loginUser } from "../api/authApi";
import { User, LoginRequest } from "../types/userTypes";

type AuthContextType = {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialisation du user depuis le token au montage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Récupère les infos de l'utilisateur depuis l'API
          const currentUser = await getCurrentUser(token);
          setUser(currentUser);
        } catch {
          // Token invalide ou expiré
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setIsInitialized(true);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { user, token } = await loginUser(credentials);
      setUser(user);
      localStorage.setItem("token", token);
      return true;
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
};
