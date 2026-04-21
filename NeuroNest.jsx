import { useState, useEffect, useRef } from "react";

const COLORS = {
  mint: "#D1FAE5",
  sky: "#E0F2FE",
  peach: "#FFEDD5",
  lavender: "#EDE9FE",
  teal: "#0D9488",
  blue: "#0EA5E9",
  purple: "#7C3AED",
  orange: "#F97316",
  slate: "#334155",
  slateLight: "#94A3B8",
};

// ── Animated Counter ──────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 20);
    return () => clearInterval(id);
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
}

// ── Radial Progress Ring ──────────────────────────────────────────
function RadialRing({ pct, color, label, size = 80 }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={6} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          style={{ fontSize: 14, fontWeight: 700, fill: color, fontFamily: "Nunito, sans-serif" }}>
          {pct}%
        </text>
      </svg>
      <span style={{ fontSize: 11, color: COLORS.slateLight, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────
function ProgressBar({ label, pct, color }) {
  const [w, setW] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(pct); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: COLORS.slate, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color: COLORS.slateLight }}>{pct}%</span>
      </div>
      <div style={{ background: "#F1F5F9", borderRadius: 999, height: 10, overflow: "hidden" }}>
        <div style={{
          width: `${w}%`, height: "100%", borderRadius: 999,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          transition: "width 1.2s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
    </div>
  );
}

// ── Floating Card ─────────────────────────────────────────────────
function FloatCard({ children, style, delay = 0 }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(16px)",
      borderRadius: 24,
      boxShadow: "0 20px 60px rgba(14,165,233,0.12), 0 4px 16px rgba(0,0,0,0.06)",
      padding: "18px 22px",
      animation: `float ${3 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      border: "1px solid rgba(255,255,255,0.6)",
      ...style
    }}>
      {children}
    </div>
  );
}

// ── Milestone Dots ────────────────────────────────────────────────
function MilestoneLine() {
  const ages = [1,2,3,4,5,6];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 20, position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: 0, right: 0,
        height: 3, background: "linear-gradient(90deg, #0EA5E9, #7C3AED)",
        borderRadius: 999, transform: "translateY(-50%)"
      }} />
      {ages.map(age => (
        <div key={age} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, gap: 8 }}>
          <div style={{
            width: age === 3 ? 28 : 18, height: age === 3 ? 28 : 18,
            borderRadius: "50%",
            background: age <= 3 ? "linear-gradient(135deg, #0EA5E9, #7C3AED)" : "#E2E8F0",
            border: age === 3 ? "3px solid white" : "none",
            boxShadow: age === 3 ? "0 4px 12px rgba(124,58,237,0.4)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s"
          }}>
            {age === 3 && <span style={{ fontSize: 10 }}>❤️</span>}
          </div>
          <span style={{ fontSize: 11, color: age <= 3 ? COLORS.purple : COLORS.slateLight, fontWeight: 700 }}>
            {age}yr
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────
function TestimonialCard({ name, role, text, avatar, color }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 24,
      padding: "24px 28px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      border: `2px solid ${color}40`,
      minWidth: 300,
      maxWidth: 340,
      flexShrink: 0
    }}>
      <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>"{text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20
        }}>{avatar}</div>
        <div>
          <div style={{ fontWeight: 700, color: COLORS.slate, fontSize: 14 }}>{name}</div>
          <div style={{ color: COLORS.slateLight, fontSize: 12 }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────
export default function NeuroNest() {
  const [activeTab, setActiveTab] = useState("home");
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [qStep, setQStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { q: "Does your child respond when you call their name?", key: "name" },
    { q: "Does your child make eye contact during play?", key: "eye" },
    { q: "Does your child use simple words (mama, dada, more)?", key: "words" },
    { q: "Does your child point to things they want?", key: "point" },
    { q: "Does your child engage in pretend play?", key: "pretend" },
  ];

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      localStorage.setItem("gameScore", gameScore);
    }
  }, [timeLeft, gameActive, gameScore]);

  function startGame() {
    setGameScore(0);
    setTimeLeft(10);
    setGameActive(true);
  }

  function handleAnswer(val) {
    const updated = { ...answers, [questions[qStep].key]: val };
    setAnswers(updated);
    if (qStep < questions.length - 1) {
      setQStep(qStep + 1);
    } else {
      const yesCount = Object.values(updated).filter(v => v === "yes").length;
      localStorage.setItem("questionScore", yesCount);
      setShowResult(true);
    }
  }

  function getRiskLevel() {
    const qScore = Object.values(answers).filter(v => v === "yes").length;
    const gScore = parseInt(localStorage.getItem("gameScore") || 0);
    const total = qScore + (gScore > 8 ? 2 : gScore > 4 ? 1 : 0);
    if (total >= 5) return { level: "Low Risk", color: "#10B981", bg: "#D1FAE5", icon: "✅", msg: "Your child shows healthy developmental patterns. Keep engaging through play!" };
    if (total >= 3) return { level: "Moderate Risk", color: "#F59E0B", bg: "#FEF3C7", icon: "⚠️", msg: "Some indicators may need attention. Consider consulting a pediatric specialist." };
    return { level: "Elevated Risk", color: "#EF4444", bg: "#FEE2E2", icon: "🔔", msg: "We recommend scheduling an evaluation with a developmental pediatrician soon." };
  }

  const testimonials = [
    { name: "Priya Sharma", role: "Mom of 3-year-old, Pune", text: "NeuroNest gave me clarity I couldn't find anywhere online. The games made it so easy!", avatar: "👩", color: "#0EA5E9" },
    { name: "Amit Kulkarni", role: "Dad of twins, Mumbai", text: "Finally something made for Indian parents. Spotted early signs in my son that the doctor confirmed.", avatar: "👨", color: "#7C3AED" },
    { name: "Sneha Reddy", role: "Mom of 4-year-old, Hyderabad", text: "The milestone tracker is incredible. I use it every month to check progress.", avatar: "👩‍💼", color: "#F97316" },
    { name: "Rahul Mehta", role: "Dad of 2-year-old, Delhi", text: "No medical jargon, no fear. Just clear guidance. This app is a game-changer.", avatar: "🧑", color: "#10B981" },
    { name: "Kavya Iyer", role: "Mom of 5-year-old, Chennai", text: "The gamified approach is brilliant. My child thinks it's playtime — they have no idea it's screening!", avatar: "👩‍🍼", color: "#EC4899" },
  ];

  // ─── GAME SCREEN ────────────────────────────────────────────────
  if (activeTab === "game") {
    return (
      <div style={styles.fullPage}>
        <style>{globalCSS}</style>
        <div style={styles.card}>
          <button onClick={() => { setActiveTab("home"); setGameActive(false); setGameScore(0); setTimeLeft(10); }}
            style={styles.backBtn}>← Back</button>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span style={styles.badge}>🎮 Reaction Game</span>
            <h2 style={styles.cardTitle}>Tap the bubble!</h2>
            <p style={{ color: COLORS.slateLight, fontSize: 14, marginTop: 8 }}>
              Tests attention & response speed
            </p>
          </div>
          {!gameActive && timeLeft === 10 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
              <button onClick={startGame} style={styles.primaryBtn}>Start Game</button>
            </div>
          )}
          {gameActive && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={styles.statBox}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.purple }}>{gameScore}</div>
                  <div style={{ fontSize: 11, color: COLORS.slateLight }}>Score</div>
                </div>
                <div style={styles.statBox}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: timeLeft <= 3 ? "#EF4444" : COLORS.teal }}>{timeLeft}s</div>
                  <div style={{ fontSize: 11, color: COLORS.slateLight }}>Time Left</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div
                  onClick={() => setGameScore(s => s + 1)}
                  style={{
                    width: 120, height: 120, borderRadius: "50%", cursor: "pointer",
                    background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36, boxShadow: "0 8px 32px rgba(14,165,233,0.4)",
                    animation: "pulse 0.8s ease-in-out infinite",
                    userSelect: "none", WebkitUserSelect: "none"
                  }}>
                  🫧
                </div>
              </div>
              <div style={{ background: "#F1F5F9", borderRadius: 999, height: 8 }}>
                <div style={{
                  width: `${(timeLeft / 10) * 100}%`, height: "100%", borderRadius: 999,
                  background: timeLeft <= 3
                    ? "linear-gradient(90deg, #EF4444, #F97316)"
                    : "linear-gradient(90deg, #0EA5E9, #7C3AED)",
                  transition: "width 1s linear, background 0.3s"
                }} />
              </div>
            </>
          )}
          {!gameActive && timeLeft === 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.purple, marginBottom: 8 }}>{gameScore}</div>
              <div style={{ color: COLORS.slateLight, marginBottom: 24 }}>bubbles tapped!</div>
              <button onClick={() => setActiveTab("questions")} style={styles.primaryBtn}>Next: Parent Questions →</button>
              <button onClick={startGame} style={{ ...styles.ghostBtn, marginTop: 12 }}>Try Again</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── QUESTIONS SCREEN ───────────────────────────────────────────
  if (activeTab === "questions") {
    return (
      <div style={styles.fullPage}>
        <style>{globalCSS}</style>
        <div style={styles.card}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={styles.badge}>📋 {qStep + 1} of {questions.length}</span>
              <span style={{ fontSize: 12, color: COLORS.slateLight }}>{Math.round(((qStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div style={{ background: "#F1F5F9", borderRadius: 999, height: 6 }}>
              <div style={{
                width: `${((qStep + 1) / questions.length) * 100}%`,
                height: "100%", borderRadius: 999,
                background: "linear-gradient(90deg, #0EA5E9, #7C3AED)",
                transition: "width 0.5s ease"
              }} />
            </div>
          </div>
          <h2 style={{ ...styles.cardTitle, marginBottom: 32 }}>{questions[qStep].q}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Always", "Sometimes", "Rarely", "Never"].map((opt) => {
              const val = opt === "Always" || opt === "Sometimes" ? "yes" : "no";
              return (
                <button key={opt} onClick={() => handleAnswer(val)}
                  style={{
                    padding: "16px 24px", borderRadius: 16, border: "2px solid #E2E8F0",
                    background: "white", cursor: "pointer", fontFamily: "Nunito, sans-serif",
                    fontSize: 15, fontWeight: 600, color: COLORS.slate, textAlign: "left",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 12
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = "#7C3AED"; e.target.style.background = "#F5F3FF"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.background = "white"; }}>
                  <span style={{ fontSize: 20 }}>
                    {opt === "Always" ? "😊" : opt === "Sometimes" ? "🤔" : opt === "Rarely" ? "😟" : "❌"}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {qStep > 0 && (
            <button onClick={() => setQStep(q => q - 1)} style={{ ...styles.ghostBtn, marginTop: 20 }}>
              ← Previous
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── RESULT SCREEN ──────────────────────────────────────────────
  if (showResult) {
    const risk = getRiskLevel();
    const yesCount = Object.values(answers).filter(v => v === "yes").length;
    const gScore = parseInt(localStorage.getItem("gameScore") || 0);
    return (
      <div style={styles.fullPage}>
        <style>{globalCSS}</style>
        <div style={{ ...styles.card, maxWidth: 480 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 52, marginBottom: 8 }}>{risk.icon}</div>
            <div style={{
              display: "inline-block", padding: "8px 20px", borderRadius: 999,
              background: risk.bg, color: risk.color, fontWeight: 800, fontSize: 18,
              marginBottom: 12
            }}>
              {risk.level}
            </div>
            <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: 1.7 }}>{risk.msg}</p>
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 20, padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: COLORS.slate, marginBottom: 16, fontSize: 14 }}>📊 Assessment Summary</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ textAlign: "center", background: "white", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.purple }}>{gScore}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>Game Score</div>
              </div>
              <div style={{ textAlign: "center", background: "white", borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.teal }}>{yesCount}/{questions.length}</div>
                <div style={{ fontSize: 11, color: COLORS.slateLight }}>Milestones Met</div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <ProgressBar label="Attention & Response" pct={Math.min(gScore * 8, 100)} color={COLORS.blue} />
            <ProgressBar label="Developmental Milestones" pct={Math.round((yesCount / questions.length) * 100)} color={COLORS.purple} />
          </div>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.lavender}, ${COLORS.sky})`,
            borderRadius: 20, padding: 20, marginBottom: 16, fontSize: 13, color: COLORS.slate, lineHeight: 1.7
          }}>
            <strong>💡 Disclaimer:</strong> NeuroNest is a screening tool, not a diagnostic tool. Always consult a qualified developmental pediatrician for professional evaluation.
          </div>
          <button onClick={() => { setActiveTab("home"); setQStep(0); setAnswers({}); setShowResult(false); setGameScore(0); setTimeLeft(10); }}
            style={styles.primaryBtn}>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // ─── HOME PAGE ──────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #F0FDF4 0%, #E0F2FE 40%, #EDE9FE 100%)", minHeight: "100vh" }}>
      <style>{globalCSS}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>🧠</div>
            <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg, #0EA5E9, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              NeuroNest
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{ padding: "8px 18px", borderRadius: 999, border: "none", background: "transparent", color: COLORS.slate, fontFamily: "Nunito, sans-serif", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
              About
            </button>
            <button
              onClick={() => setActiveTab("game")}
              style={{
                padding: "10px 22px", borderRadius: 999, border: "none",
                background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700,
                cursor: "pointer", fontSize: 14,
                boxShadow: "0 4px 16px rgba(14,165,233,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(14,165,233,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 16px rgba(14,165,233,0.3)"; }}>
              Start Free Screening →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(124,58,237,0.08)", color: COLORS.purple,
            padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700,
            marginBottom: 20, border: "1px solid rgba(124,58,237,0.15)"
          }}>
            ✨ AI-Powered Early Screening
          </div>
          <h1 style={{
            fontSize: 52, fontWeight: 900, lineHeight: 1.15,
            color: COLORS.slate, marginBottom: 20,
            letterSpacing: "-0.5px"
          }}>
            Understand Your Child's{" "}
            <span style={{
              background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>
              Development
            </span>
            {" "}Through Play
          </h1>
          <p style={{ fontSize: 18, color: COLORS.slateLight, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            NeuroNest turns everyday games into powerful insights. Detect early signs of autism and developmental delays — from home, in minutes.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveTab("game")}
              style={{
                padding: "16px 32px", borderRadius: 999, border: "none",
                background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
                color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 800,
                cursor: "pointer", fontSize: 16,
                boxShadow: "0 8px 32px rgba(14,165,233,0.35)",
                transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.target.style.transform = "none"}>
              🎮 Start Free Screening
            </button>
            <button style={{
              padding: "16px 32px", borderRadius: 999,
              border: "2px solid rgba(124,58,237,0.25)",
              background: "white", color: COLORS.slate,
              fontFamily: "Nunito, sans-serif", fontWeight: 700,
              cursor: "pointer", fontSize: 16
            }}>
              Learn More
            </button>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[
              { num: 12000, suffix: "+", label: "Screenings Done" },
              { num: 94, suffix: "%", label: "Parent Satisfaction" },
              { num: 6, suffix: " languages", label: "Supported" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.purple }}>
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: COLORS.slateLight }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", height: 420 }}>
          <FloatCard style={{ position: "absolute", top: 0, left: 20, width: 200 }} delay={0}>
            <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 10 }}>🎯 Fine Motor Skills</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadialRing pct={78} color={COLORS.blue} label="Progress" size={90} />
            </div>
          </FloatCard>
          <FloatCard style={{ position: "absolute", top: 80, right: 0, width: 220 }} delay={1}>
            <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 8 }}>📊 Weekly Activity</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 6 }}>
              {[40, 70, 55, 90, 65, 80, 75].map((h, i) => (
                <div key={i} style={{
                  width: "100%", height: h * 0.6,
                  background: i === 3 ? "linear-gradient(180deg, #7C3AED, #0EA5E9)" : "#E2E8F0",
                  borderRadius: 4
                }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9, color: COLORS.slateLight }}>
              {["M","T","W","T","F","S","S"].map((d,i) => <span key={i}>{d}</span>)}
            </div>
          </FloatCard>
          <FloatCard style={{ position: "absolute", bottom: 60, left: 0, width: 240 }} delay={0.5}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏆</div>
              <div>
                <div style={{ fontWeight: 700, color: COLORS.slate, fontSize: 13 }}>Arjun mastered!</div>
                <div style={{ color: COLORS.slateLight, fontSize: 11 }}>Stacking & sorting ✨</div>
              </div>
            </div>
          </FloatCard>
          <FloatCard style={{ position: "absolute", bottom: 0, right: 10, width: 170 }} delay={1.5}>
            <div style={{ fontSize: 11, color: COLORS.slateLight, marginBottom: 8 }}>Risk Level</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontWeight: 800, color: "#10B981", fontSize: 15 }}>Low Risk</span>
            </div>
            <div style={{ fontSize: 10, color: COLORS.slateLight, marginTop: 4 }}>Healthy development ✓</div>
          </FloatCard>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: COLORS.slate, marginBottom: 12 }}>Everything You Need</h2>
          <p style={{ color: COLORS.slateLight, fontSize: 16 }}>Three pillars of early childhood development support</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            {
              icon: "🧠", title: "Daily Play Insights", bg: "#D1FAE5", iconBg: "#10B981",
              desc: "AI-driven analysis of how your child interacts with toys and games. Get actionable insights every day.",
              tags: ["Attention", "Memory", "Focus"]
            },
            {
              icon: "📍", title: "Milestone Tracker", bg: "#E0F2FE", iconBg: "#0EA5E9",
              desc: "Visual timeline from age 1–6. See exactly where your child stands across all development areas.",
              milestone: true
            },
            {
              icon: "📚", title: "Parenting Guides", bg: "#FFEDD5", iconBg: "#F97316",
              desc: "Expert-curated, India-focused resources tailored to your child's risk profile and age group.",
              tags: ["Speech", "Social", "Motor", "Cognitive"]
            }
          ].map((f, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              borderRadius: 28, padding: "32px 28px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
              border: "1px solid rgba(255,255,255,0.6)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.06)"; }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: f.iconBg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 26, marginBottom: 20
              }}>{f.icon}</div>
              <h3 style={{ fontWeight: 800, color: COLORS.slate, fontSize: 20, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
              {f.milestone && <MilestoneLine />}
              {f.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {f.tags.map(t => (
                    <span key={t} style={{ background: f.bg, color: COLORS.slate, padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ANALYTICS */}
      <section style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "start" }}>
          <div style={{
            background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
            borderRadius: 28, padding: "36px 32px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ fontWeight: 800, color: COLORS.slate, fontSize: 22, marginBottom: 6 }}>Weekly Play Snapshot</h3>
            <p style={{ color: COLORS.slateLight, fontSize: 14, marginBottom: 32 }}>Arjun • Age 3 • Last 7 days</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 36 }}>
              <RadialRing pct={82} color="#0EA5E9" label="Mood" size={90} />
              <RadialRing pct={91} color="#7C3AED" label="Focus" size={90} />
              <RadialRing pct={74} color="#F97316" label="Creativity" size={90} />
            </div>
            <ProgressBar label="Social Sharing" pct={78} color={COLORS.purple} />
            <ProgressBar label="Problem Solving" pct={65} color={COLORS.teal} />
            <ProgressBar label="Language Use" pct={55} color={COLORS.orange} />
            <ProgressBar label="Motor Skills" pct={88} color={COLORS.blue} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              background: "linear-gradient(135deg, #EDE9FE, #E0F2FE)",
              borderRadius: 28, padding: "32px 28px"
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
              <h3 style={{ fontWeight: 800, color: COLORS.slate, fontSize: 20, marginBottom: 10 }}>Ready for Today's Adventure?</h3>
              <p style={{ color: COLORS.slateLight, fontSize: 14, marginBottom: 20 }}>
                A new 5-minute play activity has been personalized for Arjun's development stage.
              </p>
              <button
                onClick={() => setActiveTab("game")}
                style={{
                  padding: "14px 28px", borderRadius: 999, border: "none",
                  background: "linear-gradient(135deg, #7C3AED, #0EA5E9)",
                  color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 800,
                  cursor: "pointer", fontSize: 15, width: "100%"
                }}>
                Start Activity 🎯
              </button>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
              borderRadius: 28, padding: "28px 24px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)"
            }}>
              <div style={{ fontWeight: 700, color: COLORS.slate, marginBottom: 16, fontSize: 15 }}>🔔 Recent Milestones</div>
              {[
                { icon: "✅", text: "Responds to name consistently", time: "2 days ago" },
                { icon: "🌟", text: "Started using 3-word sentences", time: "5 days ago" },
                { icon: "🏅", text: "Excellent stacking game score", time: "1 week ago" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.slate }}>{m.text}</div>
                    <div style={{ fontSize: 11, color: COLORS.slateLight }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: COLORS.slate, marginBottom: 12 }}>How NeuroNest Works</h2>
        <p style={{ color: COLORS.slateLight, fontSize: 16, marginBottom: 48 }}>Simple. Fast. Reliable.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { step: "01", icon: "🎮", title: "Play Games", desc: "Your child plays 3 quick, fun games designed by child development experts." },
            { step: "02", icon: "📝", title: "Answer Questions", desc: "You answer 5 simple questions about your child's daily behavior." },
            { step: "03", icon: "🤖", title: "AI Analysis", desc: "Our AI analyzes patterns across both game data and parent inputs." },
            { step: "04", icon: "📊", title: "Get Insights", desc: "Receive a clear, color-coded report with actionable next steps." },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 20, margin: "0 auto 16px",
                background: "linear-gradient(135deg, #EDE9FE, #E0F2FE)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28
              }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: COLORS.purple, fontWeight: 800, marginBottom: 6 }}>STEP {s.step}</div>
              <h4 style={{ fontWeight: 800, color: COLORS.slate, fontSize: 16, marginBottom: 8 }}>{s.title}</h4>
              <p style={{ color: COLORS.slateLight, fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ marginBottom: 80, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: COLORS.slate }}>What Parents Say</h2>
        </div>
        <div style={{ display: "flex", gap: 20, animation: "marquee 30s linear infinite", width: "max-content", padding: "0 24px" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{
          background: "linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)",
          borderRadius: 36, padding: "60px 48px", textAlign: "center",
          boxShadow: "0 20px 80px rgba(14,165,233,0.3)"
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🧠</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "white", marginBottom: 12 }}>
            Early Action Changes Everything
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
            Join 12,000+ Indian parents who use NeuroNest for early peace of mind. Free to start. No signup required.
          </p>
          <button
            onClick={() => setActiveTab("game")}
            style={{
              padding: "18px 40px", borderRadius: 999, border: "none",
              background: "white", color: COLORS.purple,
              fontFamily: "Nunito, sans-serif", fontWeight: 800,
              cursor: "pointer", fontSize: 17,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "none"}>
            🎮 Start Free Screening Now
          </button>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 16 }}>
            Not a diagnostic tool. Always consult a qualified pediatrician for professional advice.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "32px 24px", textAlign: "center", color: COLORS.slateLight, fontSize: 13 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🧠</span>
          <span style={{ fontWeight: 800, color: COLORS.slate }}>NeuroNest</span>
        </div>
        <p>Built with ❤️ for Indian parents • Not a diagnostic tool • Always consult a pediatrician</p>
      </footer>
    </div>
  );
}

const styles = {
  fullPage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #F0FDF4 0%, #E0F2FE 40%, #EDE9FE 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "Nunito, sans-serif", padding: "24px"
  },
  card: {
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(20px)",
    borderRadius: 32,
    padding: "40px 36px",
    width: "100%", maxWidth: 420,
    boxShadow: "0 20px 80px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.6)"
  },
  cardTitle: { fontSize: 22, fontWeight: 800, color: "#334155" },
  badge: {
    display: "inline-block", padding: "6px 16px", borderRadius: 999,
    background: "linear-gradient(135deg, #EDE9FE, #E0F2FE)",
    color: "#7C3AED", fontSize: 12, fontWeight: 700, marginBottom: 12
  },
  primaryBtn: {
    width: "100%", padding: "16px 24px", borderRadius: 999,
    border: "none", background: "linear-gradient(135deg, #0EA5E9, #7C3AED)",
    color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 800,
    cursor: "pointer", fontSize: 16,
    boxShadow: "0 8px 24px rgba(14,165,233,0.3)"
  },
  ghostBtn: {
    width: "100%", padding: "12px 24px", borderRadius: 999,
    border: "2px solid #E2E8F0", background: "transparent",
    color: "#334155", fontFamily: "Nunito, sans-serif", fontWeight: 700,
    cursor: "pointer", fontSize: 15, display: "block", textAlign: "center"
  },
  backBtn: {
    border: "none", background: "transparent", color: "#94A3B8",
    fontFamily: "Nunito, sans-serif", fontWeight: 700, cursor: "pointer",
    fontSize: 14, marginBottom: 20, padding: 0, display: "block"
  },
  statBox: {
    background: "#F8FAFC", borderRadius: 16, padding: "16px 24px", textAlign: "center", flex: 1, margin: "0 6px"
  }
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(14,165,233,0.4); }
    50% { transform: scale(1.08); box-shadow: 0 12px 48px rgba(14,165,233,0.6); }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
