import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative z-[2] border-t border-border px-12 py-7 flex items-center justify-between flex-wrap gap-4">
    <div className="font-display font-black text-lg">
      Focus<span className="text-primary">Zone</span>
    </div>
    <p className="text-muted-foreground text-xs">Built with intention. No distractions.</p>
    <div className="flex gap-5">
      {[
        { label: "Home", to: "/" },
        { label: "History", to: "/history" },
        { label: "Features", to: "/features" },
        { label: "About", to: "/about" },
        { label: "Session", to: "/session" },
      ].map(({ label, to }) => (
        <Link key={label} to={to} className="text-muted-foreground text-xs hover:text-foreground transition-colors">
          {label}
        </Link>
      ))}
    </div>
  </footer>
);

export default Footer;
