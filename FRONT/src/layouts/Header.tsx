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
      {/* Logo à gauche */}
      <Link to="/">
        <img src="/images/logo.png" alt="Logo" className="h-25 w-auto" />
      </Link>

      {/* Filtres : cachés sur mobile, visibles à partir de md */}
      <nav className="hidden md:flex gap-4">
        <button className="text-sm font-medium">Végétarien</button>
        <button className="text-sm font-medium">Sans Porc</button>
      </nav>
      <ProfileButton />
    </header>
  );
}
