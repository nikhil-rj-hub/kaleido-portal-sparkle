import MeshCanvas from "@/components/MeshCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "react-router-dom";

const philosophyCards = [
  { icon: "🧠", title: "Time is not the enemy", desc: "Most people treat time as something to fight against. The Pomodoro Technique reframes it as a partner. Each 25-minute window is a promise to yourself — contained, achievable, renewable." },
  { icon: "🎯", title: "One thing at a time", desc: "Multitasking is a myth. The human brain context-switches, it doesn't truly parallel-process. Single-task focus, protected by a timer, produces higher-quality work in less total time." },
  { icon: "🔄", title: "Breaks are part of the work", desc: "Rest isn't a reward for finishing — it's an ingredient in the process. Structured short breaks prevent mental fatigue, maintain consistent quality, and improve long-term memory consolidation." },
  { icon: "📈", title: "Measure to improve", desc: "Cirillo always emphasised tracking — how many Pomodoros did you plan? How many did you complete? Where were you interrupted? Data about your focus patterns is the first step to improving them." },
];

const concepts = [
  { title: "The Pomodoro Unit", desc: "One Pomodoro = 25 minutes of uninterrupted focus on a single task, followed by a 5-minute break. It is the atomic unit of productive time. If you're interrupted and can't resume, that Pomodoro is void." },
  { title: "Planning and Estimation", desc: "At the start of each day, list your tasks and estimate how many Pomodoros each would take. This builds your instinct for how long real work takes." },
  { title: "Interruption Management", desc: "When a distraction arises, you have two choices: internal (note it for later) or external (tell whoever is asking to wait). Protecting the Pomodoro is non-negotiable." },
  { title: "The Set of Four", desc: "Every four Pomodoros form a set, followed by a long break of 15–30 minutes. This is based on the natural 90–120 minute ultradian rhythm of human alertness cycles." },
  { title: "Daily Review", desc: "End each day with a brief review: how many Pomodoros completed, how many planned, what interrupted you. Focus Zone's landmark notes support exactly this kind of reflection." },
];

const About = () => {
  return (
    <div className="min-h-screen cursor-none">
      <CustomCursor />
      <MeshCanvas />
      <Navbar />

      <div className="relative z-[2] max-w-[860px] mx-auto px-8 pt-[120px] pb-20">
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">About Focus Zone</div>
        <h1 className="font-display font-black leading-none tracking-[-2px] mb-10" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
          The <em className="italic text-primary">Why</em> Behind It
        </h1>

        {/* Founder */}
        <AnimateOnScroll className="grid grid-cols-[auto_1fr] gap-7 items-start bg-surface border border-border rounded-lg p-8 mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[32px] flex-shrink-0">🍅</div>
          <div>
            <div className="text-[19px] font-bold mb-1">Francesco Cirillo</div>
            <div className="text-xs text-primary font-semibold tracking-[0.1em] uppercase mb-3.5">Creator of the Pomodoro Technique</div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2.5">In the late 1980s, Francesco Cirillo was a university student in Rome, struggling with procrastination and distraction. His solution was radical in its simplicity: a tomato-shaped kitchen timer, a deal with himself to focus for just a few minutes, and a commitment to track the results honestly.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">What he discovered was that the boundary created by a ticking timer transformed the psychology of work. The anxiety of "I have to study all day" became "I just have to focus for the next 25 minutes."</p>
          </div>
        </AnimateOnScroll>

        {/* Quote */}
        <AnimateOnScroll className="bg-surface border border-border border-l-[3px] border-l-primary rounded-lg p-10 relative mb-14">
          <span className="absolute -top-4 left-8 font-display text-[72px] text-primary leading-none">"</span>
          <blockquote className="font-display italic text-foreground leading-relaxed" style={{ fontSize: "clamp(17px, 2.2vw, 24px)" }}>
            The objective of the Pomodoro Technique is to provide a simple tool and set of processes for improving productivity. The Pomodoro becomes a kind of ally to help you meet the challenges of time with a clear mind.
          </blockquote>
          <cite className="block mt-4 text-[13px] text-muted-foreground font-semibold not-italic">— Francesco Cirillo, The Pomodoro Technique</cite>
        </AnimateOnScroll>

        {/* Philosophy */}
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Core Philosophy</div>
        <h2 className="font-display font-black tracking-[-1px] mb-8" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
          What the <em className="italic text-primary">Method</em> Believes
        </h2>
        <div className="grid grid-cols-2 gap-5 mb-14">
          {philosophyCards.map((card) => (
            <AnimateOnScroll key={card.title} className="bg-surface border border-border rounded-lg p-7 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
              <span className="text-[26px] mb-3 block">{card.icon}</span>
              <h3 className="text-base font-bold mb-2.5">{card.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{card.desc}</p>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Concepts */}
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">The 5 Core Concepts</div>
        <h2 className="font-display font-black tracking-[-1px] mb-8" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
          What Cirillo <em className="italic text-primary">Actually Taught</em>
        </h2>
        <div className="flex flex-col gap-4 mb-14">
          {concepts.map((c, i) => (
            <AnimateOnScroll key={i} className="grid grid-cols-[40px_1fr] gap-4 bg-surface border border-border rounded-lg p-6 hover:border-primary/30 hover:translate-x-1.5 transition-all duration-300">
              <div className="font-display text-[26px] font-black text-primary leading-none">{i + 1}</div>
              <div>
                <h4 className="text-[15px] font-bold mb-1.5">{c.title}</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Why we built it */}
        <div className="mb-14">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">About This App</div>
          <h2 className="font-display font-black tracking-[-1px] mb-6" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
            Why We Built <em className="italic text-primary">Focus Zone</em>
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">The Pomodoro Technique is 35+ years old, and its core insight has not changed: <strong className="text-foreground font-semibold">a timer makes focus feel possible</strong>. But we felt one thing was missing from most implementations.</p>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">When you're studying or working intensely, you often hit a moment of genuine progress — you finally understand a concept, crack a problem, or finish a chapter. That moment passes silently, unrecorded.</p>
          <p className="text-[15px] text-muted-foreground leading-relaxed"><strong className="text-foreground font-semibold">Landmark notes</strong> were built to fix that. They let you mark exactly when something clicked. Over time, your landmark log becomes a <strong className="text-foreground font-semibold">personal map of your learning</strong>.</p>
        </div>

        {/* CTA */}
        <AnimateOnScroll className="text-center bg-surface border border-border rounded-lg p-12">
          <h3 className="font-display font-black text-[32px] mb-3">Start your first session</h3>
          <p className="text-[15px] text-muted-foreground mb-7">It takes 10 seconds to set up. The first Pomodoro will tell you everything.</p>
          <Link to="/session" className="inline-block bg-primary text-primary-foreground font-bold text-sm tracking-wider px-9 py-3.5 rounded-full hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,46,0.3)] transition-all">
            ⏱ Open Session
          </Link>
        </AnimateOnScroll>
      </div>

      <Footer />
    </div>
  );
};

export default About;
