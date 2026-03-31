import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "History", to: "/history" },
    { label: "Features", to: "/features" },
    { label: "About", to: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-5 backdrop-blur-xl bg-background/70 border-b border-white/5 transition-all">
      <Link to="/" className="font-display font-black text-[22px] text-foreground tracking-tight">
        Focus<span className="text-primary">Zone</span>
      </Link>
      <ul className="flex gap-2 items-center list-none">
        {navItems.map(({ label, to }) => (
          <li key={label}>
            <Link
              to={to}
              className={`text-[13px] font-semibold uppercase tracking-[0.08em] px-4 py-2 rounded-full transition-all ${
                isActive(to)
                  ? "text-foreground bg-white/[0.07]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/session"
            className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${
              isActive("/session")
                ? "bg-primary text-primary-foreground"
                : "bg-primary text-primary-foreground hover:brightness-110"
            }`}
          >
            ⏱ Session
          </Link>
        </li>
        {user && (
          <li>
            <button
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-white/5"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
