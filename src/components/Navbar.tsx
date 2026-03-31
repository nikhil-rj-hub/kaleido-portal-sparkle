import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-5 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <Link to="/" className="font-display font-black text-[22px] text-foreground tracking-tight">
        Focus<span className="text-primary">Zone</span>
      </Link>
      <ul className="flex gap-2 items-center list-none">
        {["Home", "History", "Features", "About"].map((item) => (
          <li key={item}>
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-muted-foreground text-[13px] font-semibold uppercase tracking-[0.08em] px-4 py-2 rounded-full transition-all hover:text-foreground hover:bg-white/5"
            >
              {item}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/session"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-[13px] font-bold transition-all hover:brightness-110"
          >
            ⏱ Session
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
