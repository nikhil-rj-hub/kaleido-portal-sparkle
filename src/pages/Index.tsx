import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import MeshCanvas from "@/components/MeshCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";
import { Timer, BarChart3, Bell } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-display font-black text-2xl animate-pulse">
          Focus<span className="text-primary">Zone</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/session" replace />;
  }

  return (
    <div className="min-h-screen cursor-none">
      <CustomCursor />
      <MeshCanvas />
      <Navbar />

      <main className="relative z-[2] min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Hero */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-8 animate-fade-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ animation: "blink 1.4s infinite" }} />
              Deep Work, Redefined
            </div>

            <h1 className="font-display font-black text-foreground leading-[0.92] tracking-[-3px] mb-6 animate-fade-slide-up-delay-1"
                style={{ fontSize: "clamp(48px, 7vw, 90px)" }}>
              Enter the<br />
              <em className="italic text-primary">Focus</em>{" "}
              <span className="text-foreground/30">Zone</span>
            </h1>

            <p className="text-muted-foreground text-[17px] leading-relaxed max-w-md mx-auto lg:mx-0 mb-10 animate-fade-slide-up-delay-2">
              Pomodoro-powered sessions that train your focus muscle. Track landmarks, earn streaks, and own your deep work.
            </p>

            <div className="flex gap-4 flex-wrap justify-center lg:justify-start animate-fade-slide-up-delay-4">
              {[
                { icon: Timer, label: "Precision Timer", val: "25:00" },
                { icon: BarChart3, label: "Session Stats", val: "Live" },
                { icon: Bell, label: "Smart Alerts", val: "3-tone" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="bg-white/[0.04] border border-border rounded-xl px-5 py-3.5 text-center backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-primary" />
                    <span className="font-display text-lg font-bold text-foreground">{val}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Auth */}
          <div className="animate-fade-slide-up-delay-3">
            <div className="bg-surface/80 backdrop-blur-xl border border-border rounded-2xl p-8 lg:p-10">
              <div className="text-center mb-6">
                <h2 className="font-display font-black text-2xl text-foreground mb-2">Start Your Session</h2>
                <p className="text-sm text-muted-foreground">Join thousands of focused makers</p>
              </div>
              <AuthForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
