import MeshCanvas from "@/components/MeshCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "react-router-dom";

const primaryFeatures = [
  {
    icon: "⏱",
    title: "Precision Timer with Progress Ring",
    desc: "A live SVG ring depletes in real time as your Pomodoro counts down. Glanceable, calming, and always visible. Supports all three modes — Pomodoro, Short Break, and Long Break — with smooth colour transitions.",
    badge: "Core Feature",
  },
  {
    icon: "📍",
    title: "Landmark Notes — Timestamped Progress",
    desc: "Pin a note at any moment mid-session. Each landmark captures: the exact clock time, how much timer was left, your current mode, the session number, and the date. Tag it and export your full log.",
    badge: "Signature Feature",
  },
];

const secondaryFeatures = [
  { icon: "⚙️", title: "Custom Timer Durations", desc: "Set your own Pomodoro length (1–90 min), Short Break (1–30 min), and Long Break (1–60 min). Apply any time." },
  { icon: "🔁", title: "Auto Cycle Logic", desc: "After 4 Pomodoros the app auto-transitions to a Long Break. After any break it returns to Focus mode." },
  { icon: "📊", title: "Live Session Stats", desc: "Your Pomodoro count, total focused minutes, and streak are tracked in real time throughout the session." },
  { icon: "🔔", title: "Audio Completion Signal", desc: "A crisp 3-tone beep plays via the Web Audio API when each timer completes. No browser notification permissions needed." },
  { icon: "🌓", title: "Mode-Aware Colour Shifts", desc: "The interface shifts from red (focus) to green (break) as you switch modes. All accent colours update in sync." },
  { icon: "💾", title: "Persistent Landmark Storage", desc: "Landmarks are saved to localStorage automatically. They persist across sessions and browser restarts." },
];

const howSteps = [
  { n: "1", title: "Set Your Timer", desc: "Optionally customise durations in Settings. Default is 25 / 5 / 15 min." },
  { n: "2", title: "Focus", desc: "Hit Start. Work on one task until the ring depletes and the beep fires." },
  { n: "3", title: "Pin Landmarks", desc: "Any time mid-session, write a note and pin it. It's timestamped instantly." },
  { n: "4", title: "Break & Repeat", desc: "Take your break, then return. After 4 rounds, take the long break." },
];

const Features = () => {
  return (
    <div className="min-h-screen cursor-none">
      <CustomCursor />
      <MeshCanvas />
      <Navbar />

      <div className="relative z-[2] max-w-[1100px] mx-auto px-8 pt-[120px] pb-20">
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">What You Get</div>
        <h1 className="font-display font-black leading-none tracking-[-2px] mb-5" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
          Built for <em className="italic text-primary">Real</em> Deep Work
        </h1>
        <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[600px] mb-16">
          Every feature in Focus Zone is designed to get you into flow faster, keep you there longer, and give you a record of what you actually accomplished.
        </p>

        {/* Primary features */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {primaryFeatures.map((f) => (
            <AnimateOnScroll key={f.title} className="group bg-surface border border-border rounded-lg p-9 relative overflow-hidden hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
              <span className="text-4xl mb-4 block">{f.icon}</span>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <span className="inline-block mt-4 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
                {f.badge}
              </span>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Secondary features */}
        <div className="grid grid-cols-3 gap-5 mb-14">
          {secondaryFeatures.map((f) => (
            <AnimateOnScroll key={f.title} className="bg-surface border border-border rounded-lg p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <span className="text-[26px] mb-3 block">{f.icon}</span>
              <h3 className="text-base font-bold mb-2">{f.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </AnimateOnScroll>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">How It Works</div>
          <h2 className="font-display font-black tracking-[-1px] mb-9" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            A Session in <em className="italic text-primary">4 Steps</em>
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {howSteps.map((step, i) => (
              <AnimateOnScroll key={i} className="relative bg-surface border border-border rounded-lg p-5 text-center hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                {i < 3 && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-base text-muted-foreground z-[1]">→</span>
                )}
                <div className="font-display text-[32px] font-black text-primary leading-none mb-2.5">{step.n}</div>
                <h4 className="text-sm font-bold mb-1.5">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimateOnScroll className="text-center bg-surface border border-border rounded-lg p-12">
          <h3 className="font-display font-black text-[32px] mb-3">See it in action</h3>
          <p className="text-[15px] text-muted-foreground mb-7">Open a session and try it yourself — it takes 30 seconds to start.</p>
          <Link to="/session" className="inline-block bg-primary text-primary-foreground font-bold text-sm tracking-wider px-9 py-3.5 rounded-full hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,46,0.3)] transition-all">
            ⏱ Start a Session
          </Link>
        </AnimateOnScroll>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
