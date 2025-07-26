import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/users";

export default function ProfileButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleProfileClick}
      className="flex flex-col items-center hover:opacity-80 transition-opacity"
    >
      <img
        src={
          user
            ? "/images/connected-profile.png"
            : "/images/not-connected-profile.png"
        }
        alt={user ? "Mon compte" : "Se connecter"}
        className="h-10 w-auto md:h-15 md:w-auto object-contain rounded-full"
      />
      {user ? (
        <span
          onClick={handleLogoutClick}
          className="text-xs text-gray-600 mt-1 cursor-pointer hover:underline"
        >
          Se déconnecter
        </span>
      ) : (
        <span className="text-xs text-gray-600 mt-1">Se connecter</span>
      )}
    </button>
  );
}
