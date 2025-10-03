import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/users";
import { CircleUserRound } from "lucide-react";

export default function ProfileButton() {
  const { user, logout, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isInitialized) return null;

  const handleProfileClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
  };

  return (
    <button
      data-testid="profile-button"
      onClick={handleProfileClick}
      className="flex flex-col items-center hover:opacity-80 transition-opacity"
    >
      <CircleUserRound
        size={40}
        className={`transition-colors duration-300 ${
          user ? "text-[#B0B18C]" : "text-[#EDC59D]"
        }`}
      />
      {user ? (
        <span
          onClick={handleLogoutClick}
          className="text-xs text-gray-600 mt-1 cursor-pointer hover:underline"
        >
          Se déconnecter
        </span>
      ) : (
        <span className="text-xs text-gray-600 mt-1 cursor-pointer hover:underline">
          Se connecter
        </span>
      )}
    </button>
  );
}
