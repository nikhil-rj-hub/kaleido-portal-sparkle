import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Welcome back to the Zone!");
      } else {
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mode toggle */}
      <div className="flex gap-1.5 p-1.5 rounded-full border border-border bg-surface mb-8">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
            mode === "login"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Log In
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
            mode === "signup"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="animate-fade-slide-up">
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-surface border border-border rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full group relative overflow-hidden bg-primary text-primary-foreground font-bold text-sm tracking-wider uppercase py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 animate-glow-pulse disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? "Please wait..." : mode === "login" ? "Enter the Zone" : "Create Account"}
            {!loading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-[-15deg]" />
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
