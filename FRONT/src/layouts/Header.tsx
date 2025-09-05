import { Link, useNavigate } from "react-router-dom";
import { useAuth, ProfileButton } from "@/features/users";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="flex items-center justify-between px-4 bg-white shadow-md">
      {/* Logo cliquable */}
      <Link to="/">
        <img src="/images/logo.png" alt="Logo" className="h-25 w-auto" />
      </Link>
      <ProfileButton />
    </header>
  );
}
