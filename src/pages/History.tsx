import MeshCanvas from "@/components/MeshCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Link } from "react-router-dom";

const timelineItems = [
  {
    year: "Late 1980s",
    title: "The Tomato Timer is Born",
    desc: "Francesco Cirillo was a university student in Rome struggling with distraction and procrastination. He made a deal with himself: focus for just 2 minutes with zero distractions. The only timer he had was a tomato-shaped kitchen clock on his desk. He wound it to 2 minutes, and something clicked. Over the next weeks he refined the interval, eventually settling on 25 minutes as the ideal focus window.",
    tag: "Origin",
  },
  {
    year: "1992",
    title: "The Method Gets Formalised",
    desc: "After years of personal practice and refining the rules with fellow students and colleagues, Cirillo documented the technique formally. The core structure crystallised: 25 minutes of focused work (one Pomodoro), followed by a 5-minute short break. After every 4 Pomodoros, a longer rest of 15–30 minutes.",
    tag: "Formalisation",
  },
  {
    year: "2006",
    title: 'The Book — And the Internet Finds It',
    desc: 'Cirillo published "The Pomodoro Technique" as a freely available PDF. It spread quickly through programmer forums, productivity blogs, and university communities worldwide. The simplicity was the point — no app required, no subscription, no setup. Just a timer, a task list, and the commitment to focus.',
    tag: "Publication",
  },
  {
    year: "2010s",
    title: "The Digital Pomodoro Explosion",
    desc: "As smartphones became universal, hundreds of Pomodoro apps appeared across every platform. The technique was studied in academic research on attention, cognitive fatigue, and the psychology of deep work. Cal Newport's 2016 book \"Deep Work\" reinforced the scientific case for time-blocked concentration.",
    tag: "Digital Age",
  },
  {
    year: "Today — Focus Zone",
    title: "The Next Chapter",
    desc: "Focus Zone is built on the original Pomodoro framework and adds one key innovation: landmark notes. You can pin a timestamped note mid-session — \"Finished Chapter 6\", \"Fixed the recursion bug\". Your sessions become a living log of progress.",
    tag: "Now",
  },
];

const scienceCards = [
  { icon: "🧠", title: "Ultradian Rhythms", desc: "The human brain cycles through high-focus and low-focus states roughly every 90–120 minutes. The Pomodoro technique works with these natural cycles — 25 minutes sits comfortably within a high-focus window." },
  { icon: "⚡", title: "The Zeigarnik Effect", desc: "The mind naturally remembers incomplete tasks more vividly than completed ones. Starting a Pomodoro \"commits\" your brain to the task, keeping it mentally engaged." },
  { icon: "🎯", title: "Single-Tasking", desc: "Research consistently shows that multitasking reduces the quality of work on all tasks simultaneously. The Pomodoro technique enforces mono-focus: one task, one timer." },
  { icon: "🔄", title: "Spaced Recovery", desc: "Short, structured breaks are more restorative than working straight through. They allow the Default Mode Network to consolidate what you just learned." },
];

const steps = [
  { title: "Choose a task", desc: "Pick one specific task you want to work on. Write it down. Don't multitask." },
  { title: "Set the timer to 25 minutes", desc: "Wind the timer (or hit Start in Focus Zone). The act of starting creates a commitment ritual." },
  { title: "Work until the timer rings", desc: "No checking messages, no switching tabs. If something comes up, note it and return to focus." },
  { title: "Mark a Pomodoro complete", desc: "Put a checkmark on paper or let Focus Zone record it. Visible progress is a powerful motivator." },
  { title: "Take a 5-minute short break", desc: "Step away from the screen. Stretch, breathe, hydrate. Do not think about the task." },
  { title: "After 4 Pomodoros, take a long break", desc: "30 minutes away from work. Go for a walk, eat something, rest properly. Then begin fresh." },
];

const History = () => {
  return (
    <div className="min-h-screen cursor-none">
      <CustomCursor />
      <MeshCanvas />
      <Navbar />

      <div className="relative z-[2] max-w-[880px] mx-auto px-8 pt-[120px] pb-20">
        <div className="mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">The Origin Story</div>
          <h1 className="font-display font-black leading-none tracking-[-2px] mb-5" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            How a <em className="italic text-primary">Tomato</em><br />Changed Productivity
          </h1>
          <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[600px]">
            From a kitchen timer in Rome to one of the world's most practised focus techniques — the full story of the Pomodoro Method.
          </p>
        </div>

        <AnimateOnScroll className="bg-surface border border-border border-l-[3px] border-l-primary rounded-lg p-7 mb-14 text-[15px] text-muted-foreground leading-relaxed">
          The word <strong className="text-foreground font-semibold">Pomodoro</strong> is Italian for <strong className="text-foreground font-semibold">tomato</strong>. In the late 1980s, a university student named Francesco Cirillo used a tomato-shaped kitchen timer to track his study sessions. That small object gave the technique its name — and started a productivity revolution.
        </AnimateOnScroll>

        {/* Timeline */}
        <div className="relative flex flex-col">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          {timelineItems.map((item) => (
            <AnimateOnScroll key={item.year} className="grid grid-cols-[80px_1fr] gap-6 items-start py-6 group">
              <div className="flex justify-center pt-1.5 relative z-[1]">
                <div className="w-3.5 h-3.5 rounded-full bg-border border-2 border-background transition-all duration-300 group-hover:bg-primary group-hover:scale-[1.4] group-hover:shadow-[0_0_16px_rgba(255,77,46,0.5)]" />
              </div>
              <div className="bg-surface border border-border rounded-lg p-6 transition-all duration-300 group-hover:border-primary/35 group-hover:translate-x-1.5 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <div className="font-display text-[13px] font-bold text-primary tracking-wide mb-2">{item.year}</div>
                <div className="text-lg font-bold text-foreground mb-2.5 leading-tight">{item.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                <span className="inline-block mt-3 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Science */}
        <div className="mt-[72px]">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">The Science</div>
          <h2 className="font-display font-black tracking-[-1px] mb-9" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Why 25 Minutes <em className="italic text-primary">Works</em>
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {scienceCards.map((card) => (
              <AnimateOnScroll key={card.title} className="bg-surface border border-border rounded-lg p-7 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <span className="text-[26px] mb-3 block">{card.icon}</span>
                <h3 className="text-base font-bold mb-2.5">{card.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{card.desc}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mt-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">The Method</div>
          <h2 className="font-display font-black tracking-[-1px] mb-8" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            The Original <em className="italic text-primary">6 Steps</em>
          </h2>
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <AnimateOnScroll key={i} className="flex gap-5 items-start bg-surface border border-border rounded-lg p-5 hover:border-primary/30 hover:translate-x-1.5 transition-all duration-300">
                <div className="font-display text-[28px] font-black text-primary leading-none flex-shrink-0 min-w-[36px]">{i + 1}</div>
                <div>
                  <h4 className="text-[15px] font-bold mb-1.5">{step.title}</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimateOnScroll className="mt-16 text-center bg-surface border border-border rounded-lg p-12">
          <h3 className="font-display font-black text-[32px] mb-3">Ready to try it?</h3>
          <p className="text-[15px] text-muted-foreground mb-7">Open a session and start your first Pomodoro right now.</p>
          <Link to="/session" className="inline-block bg-primary text-primary-foreground font-bold text-sm tracking-wider px-9 py-3.5 rounded-full hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,46,0.3)] transition-all">
            ⏱ Start a Session
          </Link>
        </AnimateOnScroll>
      </div>

      <Footer />
    </div>
  );
};

export default History;
