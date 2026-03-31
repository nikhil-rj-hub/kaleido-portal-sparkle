import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const CIRC = 2 * Math.PI * 90;

interface Landmark {
  note: string;
  tag: string;
  time: string;
  date: string;
  timerLeft: string;
  mode: string;
  session: number;
}

const MODES: Record<string, { label: string; mins: number }> = {
  pomodoro: { label: "Focus", mins: 25 },
  short: { label: "Short Break", mins: 5 },
  long: { label: "Long Break", mins: 15 },
};

const Session = () => {
  const [currentMode, setCurrentMode] = useState("pomodoro");
  const [totalSec, setTotalSec] = useState(MODES.pomodoro.mins * 60);
  const [remainSec, setRemainSec] = useState(MODES.pomodoro.mins * 60);
  const [running, setRunning] = useState(false);
  const [completedPoms, setCompletedPoms] = useState(0);
  const [focusedMins, setFocusedMins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionNum, setSessionNum] = useState(1);
  const [isBreakMode, setIsBreakMode] = useState(false);

  // Settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [setPomo, setSetPomo] = useState(25);
  const [setShort, setSetShort] = useState(5);
  const [setLong, setSetLong] = useState(15);

  // Landmarks
  const [landmarks, setLandmarks] = useState<Landmark[]>(() => {
    try { return JSON.parse(localStorage.getItem("fz_landmarks") || "[]"); } catch { return []; }
  });
  const [noteText, setNoteText] = useState("");
  const [selectedTag, setSelectedTag] = useState("📚 Study");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const ringOffset = CIRC * (1 - remainSec / totalSec);

  const playBeep = useCallback(() => {
    try {
      const ac = new AudioContext();
      [0, 160, 320].forEach((d) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.value = 880; o.type = "sine";
        g.gain.setValueAtTime(0, ac.currentTime + d / 1000);
        g.gain.linearRampToValueAtTime(0.3, ac.currentTime + d / 1000 + 0.01);
        g.gain.linearRampToValueAtTime(0, ac.currentTime + d / 1000 + 0.35);
        o.start(ac.currentTime + d / 1000);
        o.stop(ac.currentTime + d / 1000 + 0.4);
      });
    } catch {}
  }, []);

  const switchMode = useCallback((mode: string, autoStart = false) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setCurrentMode(mode);
    const secs = MODES[mode].mins * 60;
    setTotalSec(secs);
    setRemainSec(secs);
    setIsBreakMode(mode !== "pomodoro");
    if (autoStart) {
      setTimeout(() => setRunning(true), 100);
    }
  }, []);

  const onComplete = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setRemainSec(0);
    playBeep();

    if (currentMode === "pomodoro") {
      setCompletedPoms((p) => p + 1);
      setFocusedMins((f) => f + MODES.pomodoro.mins);
      setStreak((s) => s + 1);
      setSessionNum((n) => n + 1);
      const next = (completedPoms + 1) % 4 === 0 ? "long" : "short";
      toast(`🍅 Pomodoro #${completedPoms + 1} done! Starting ${next === "long" ? "Long" : "Short"} Break…`);
      setTimeout(() => switchMode(next, true), 1800);
    } else {
      toast("💪 Break over — time to focus!");
      setTimeout(() => switchMode("pomodoro"), 1800);
    }
  }, [currentMode, completedPoms, playBeep, switchMode]);

  // Timer tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemainSec((prev) => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, onComplete]);

  // Update title
  useEffect(() => {
    document.title = `${fmt(remainSec)} · Focus Zone`;
  }, [remainSec]);

  // Save landmarks
  useEffect(() => {
    localStorage.setItem("fz_landmarks", JSON.stringify(landmarks));
  }, [landmarks]);

  // Apply settings
  const applySettings = () => {
    const p = Math.min(90, Math.max(1, setPomo || 25));
    const s = Math.min(30, Math.max(1, setShort || 5));
    const l = Math.min(60, Math.max(1, setLong || 15));
    MODES.pomodoro.mins = p; MODES.short.mins = s; MODES.long.mins = l;
    setSetPomo(p); setSetShort(s); setSetLong(l);
    switchMode(currentMode);
    setSettingsOpen(false);
    toast("✅ Timer settings applied");
  };

  const pinLandmark = () => {
    if (!noteText.trim()) return;
    const now = new Date();
    const lm: Landmark = {
      note: noteText.trim(),
      tag: selectedTag,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      date: now.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" }),
      timerLeft: `${fmt(remainSec)} left`,
      mode: MODES[currentMode].label,
      session: sessionNum,
    };
    setLandmarks((prev) => [...prev, lm]);
    setNoteText("");
    toast("📍 Landmark pinned!");
  };

  const exportLog = () => {
    if (landmarks.length === 0) { toast("No landmarks to export"); return; }
    const lines = ["Focus Zone — Landmark Log", "=".repeat(40), ""];
    landmarks.forEach((lm, i) => {
      lines.push(`[${i + 1}] ${lm.date} at ${lm.time}`);
      lines.push(`    Mode: ${lm.mode} · Session ${lm.session} · ${lm.timerLeft}`);
      lines.push(`    Tag:  ${lm.tag}`);
      lines.push(`    Note: ${lm.note}`);
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `focuszone-landmarks-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    toast("📄 Log exported");
  };

  const activeDots = completedPoms % 4;
  const statsDisplay = focusedMins >= 60
    ? `${Math.floor(focusedMins / 60)}h${focusedMins % 60 || ""}`
    : `${focusedMins}m`;

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Navbar />

      <main className="grid grid-cols-[1fr_380px] min-h-[calc(100vh-65px)] mt-[65px]" style={{ gap: 0 }}>
        {/* LEFT: Timer Panel */}
        <div className={`flex flex-col items-center justify-center p-12 gap-7 border-r border-border ${running ? "running" : ""}`}>
          {/* Mode tabs */}
          <div className="flex gap-1.5 p-1.5 rounded-full border border-border bg-surface">
            {Object.entries(MODES).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  currentMode === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Ring */}
          <div className="relative w-[220px] h-[220px]">
            <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="110" cy="110" r="90" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
              <circle
                cx="110" cy="110" r="90" fill="none"
                stroke={isBreakMode ? "#3ecf72" : "hsl(var(--primary))"}
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={ringOffset}
                style={{
                  transition: "stroke-dashoffset 1s linear, stroke 0.5s",
                  animation: running ? "pulse 2s ease-in-out infinite" : "none",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <div className="font-display text-[64px] font-black tracking-tight leading-none">{fmt(remainSec)}</div>
              <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                {MODES[currentMode].label}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2.5 items-center">
            <button
              onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setRunning(false); setRemainSec(totalSec); }}
              className="w-11 h-11 rounded-[10px] bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all flex items-center justify-center text-lg"
              title="Reset"
            >↺</button>
            <button
              onClick={() => setRunning(!running)}
              className="px-9 py-3 rounded-[10px] bg-primary text-primary-foreground font-semibold text-sm tracking-wider hover:brightness-110 hover:-translate-y-0.5 transition-all"
            >
              {running ? "Pause" : remainSec < totalSec ? "Resume" : "Start"}
            </button>
            <button
              onClick={onComplete}
              className="w-11 h-11 rounded-[10px] bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all flex items-center justify-center text-lg"
              title="Skip"
            >⏭</button>
          </div>

          {/* Session dots */}
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  (activeDots === 0 && completedPoms > 0) || i < activeDots
                    ? "bg-primary scale-[1.2]"
                    : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="flex border border-border rounded-lg overflow-hidden w-full max-w-[400px]">
            {[
              { val: completedPoms, label: "Pomodoros" },
              { val: statsDisplay, label: "Focused" },
              { val: streak, label: "Streak" },
            ].map(({ val, label }) => (
              <div key={label} className="flex-1 p-4 text-center border-r border-border last:border-r-0 hover:bg-secondary/50 transition-colors">
                <div className="font-display text-[26px] font-bold leading-none">{val}</div>
                <div className="text-[10px] font-semibold text-muted-foreground tracking-[0.12em] uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="w-full max-w-[400px]">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full bg-surface border border-border rounded-lg text-muted-foreground font-semibold text-xs tracking-[0.1em] uppercase px-4 py-3 flex items-center justify-between hover:text-foreground hover:border-muted-foreground/40 transition-all"
            >
              <span>⚙ Timer Settings</span>
              <span className={`transition-transform duration-300 ${settingsOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {settingsOpen && (
              <div className="bg-surface border border-border border-t-0 rounded-b-lg p-5 flex flex-col gap-3.5">
                {[
                  { label: "Pomodoro (min)", val: setPomo, set: setSetPomo, min: 1, max: 90 },
                  { label: "Short Break (min)", val: setShort, set: setSetShort, min: 1, max: 30 },
                  { label: "Long Break (min)", val: setLong, set: setSetLong, min: 1, max: 60 },
                ].map(({ label, val, set, min, max }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <label className="text-[13px]">{label}</label>
                    <input
                      type="number" min={min} max={max} value={val}
                      onChange={(e) => set(+e.target.value)}
                      className="w-[70px] bg-background border border-border rounded-lg px-2.5 py-1.5 text-sm text-center text-foreground focus:border-primary outline-none transition-colors"
                    />
                  </div>
                ))}
                <button
                  onClick={applySettings}
                  className="bg-primary text-primary-foreground text-xs font-semibold tracking-wider py-2.5 px-5 rounded-lg w-full mt-1 hover:brightness-110 transition-all"
                >
                  Apply Settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Landmark Panel */}
        <div className="flex flex-col bg-surface h-[calc(100vh-65px)] sticky top-[65px] overflow-hidden">
          <div className="p-6 pb-4 border-b border-border">
            <h2 className="font-display text-lg font-bold">📍 Landmark <span className="text-primary">Notes</span></h2>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Pin a timestamped note right now — mark when you finished a topic, cracked a problem, or hit a milestone.</p>
          </div>

          {/* Form */}
          <div className="p-4 border-b border-border flex flex-col gap-2.5">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) pinLandmark(); }}
              rows={2}
              placeholder="e.g. Finished Chapter 4 — Recursion concepts clear ✓"
              className="w-full bg-background border border-border rounded-[10px] px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground resize-none focus:border-primary outline-none transition-colors"
            />
            <div className="flex gap-2">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-background border border-border text-muted-foreground font-body text-xs px-3 py-2.5 rounded-[10px] outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {["📚 Study", "💡 Insight", "✅ Completed", "🐛 Debug", "🎯 Goal", "⚠️ Note"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={pinLandmark}
                className="bg-primary text-primary-foreground font-bold text-xs tracking-wider px-4 py-2.5 rounded-[10px] whitespace-nowrap hover:brightness-110 hover:-translate-y-0.5 transition-all"
              >
                📍 Pin
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
            {landmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground text-center">
                <div className="text-[32px] opacity-40">📌</div>
                <p className="text-[13px] leading-relaxed max-w-[220px]">No landmarks yet. Start a session and pin notes as you progress.</p>
              </div>
            ) : (
              [...landmarks].reverse().map((lm, idx) => {
                const realIdx = landmarks.length - 1 - idx;
                return (
                  <div key={realIdx} className="bg-background border border-border rounded-xl p-3.5 hover:border-primary/30 transition-colors" style={{ animation: "slideIn 0.35s ease both" }}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full">⏰ {lm.time}</span>
                        <span className="bg-white/5 border border-border text-muted-foreground text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full">{lm.tag}</span>
                        <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full">{lm.timerLeft}</span>
                      </div>
                      <button
                        onClick={() => {
                          setLandmarks((prev) => prev.filter((_, i) => i !== realIdx));
                          toast("🗑 Landmark removed");
                        }}
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 text-sm p-0.5 rounded transition-all flex-shrink-0"
                      >✕</button>
                    </div>
                    <div className="text-[13px] leading-relaxed">{lm.note}</div>
                    <div className="mt-1.5 text-[10px] text-muted-foreground tracking-wider">{lm.date} · Session {lm.session} · {lm.mode}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer controls */}
          <div className="p-3 border-t border-border flex gap-2">
            <button
              onClick={exportLog}
              className="flex-1 border border-border text-muted-foreground font-semibold text-[11px] tracking-wider uppercase py-2.5 rounded-lg hover:text-foreground hover:border-muted-foreground/40 transition-all"
            >
              ⬇ Export Log
            </button>
            <button
              onClick={() => {
                if (landmarks.length === 0) return;
                if (confirm("Clear all landmarks?")) {
                  setLandmarks([]);
                  toast("🗑 All landmarks cleared");
                }
              }}
              className="border border-primary/20 text-primary/60 font-semibold text-[11px] tracking-wider uppercase py-2.5 px-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
            >
              Clear All
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Session;
