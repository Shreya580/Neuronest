import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { saveGameData } from "../../engine/scoring";

// Sensory fixation task: spinning/repetitive vs novel/bouncing stimulus
// Based on START "wheel task" (Tavassoli et al., 2016; Dubey et al., 2024)
// Key metric: proportion of taps on SPINNING vs BOUNCING
// Autistic children show HIGHER fascination with repetitive/spinning stimuli

const ROUNDS = 10;

export default function Game2Sensory() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro");
  const [round, setRound] = useState(0);
  const [taps, setTaps] = useState({ spinning: 0, bouncing: 0 });
  const [feedback, setFeedback] = useState(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [bounceY, setBounceY] = useState(0);
  

  // Animate spinning wheel
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => setSpinAngle(a => a + 8), 50);
    return () => clearInterval(id);
  }, [phase]);

  // Animate bouncing ball
  useEffect(() => {
    if (phase !== "playing") return;
    let t = 0;
    const id = setInterval(() => {
      t += 0.15;
      setBounceY(Math.abs(Math.sin(t)) * 30);
    }, 50);
    return () => clearInterval(id);
  }, [phase]);

  function handleTap(type) {
    if (feedback) return;
    setFeedback(type);
    const updated = { ...taps, [type]: taps[type] + 1 };
    setTaps(updated);

    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= ROUNDS) {
        saveGameData("sensory", updated);
        setPhase("done");
      } else {
        setRound(r => r + 1);
      }
    }, 600);
  }

  return (
    <Layout step={2} totalSteps={4}>
      <div className="text-center mb-5">
        <span className="inline-block bg-gradient-to-r from-sky-100 to-blue-100 text-sky-600 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-sky-200">
          🎮 Game 2 of 3 · Sensory Preference
        </span>
        <h2 className="text-2xl font-black text-slate-800">Which one is more fun? 🌀</h2>
        <p className="text-slate-400 text-sm mt-1">Let your child tap whichever catches their eye!</p>
      </div>

      {phase === "intro" && (
        <div className="text-center">
          <div className="text-7xl mb-5 inline-block">🌀</div>
          <div className="bg-sky-50 rounded-2xl p-5 mb-6 border border-sky-100 text-sm text-slate-600 leading-relaxed">
            <strong>How to play:</strong> Two moving things will appear. Let your child tap the one they want to watch more! <br /><br />
            <span className="text-xs text-slate-400">This measures sensory processing preferences, a key autism domain.</span>
          </div>
          <button onClick={() => setPhase("playing")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-lg shadow-xl hover:scale-105 transition">
            🚀 Start!
          </button>
        </div>
      )}

      {phase === "playing" && (
        <>
          <div className="mb-5">
            <div className="flex justify-between mb-2 text-xs font-bold text-slate-400">
              <span>Round {round + 1} of {ROUNDS}</span>
              <span>{Math.round((round / ROUNDS) * 100)}% done</span>
            </div>
            <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
                style={{ width: `${(round / ROUNDS) * 100}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Spinning stimulus */}
            <button
              onClick={() => handleTap("spinning")}
              className={`h-44 rounded-3xl flex flex-col items-center justify-center border-4 transition-all duration-200 select-none
                ${feedback === "spinning" ? "border-blue-400 bg-blue-50 scale-95" : "border-slate-100 bg-white hover:border-sky-300 shadow-md"}`}>
              <div style={{ transform: `rotate(${spinAngle}deg)`, fontSize: 56, transition: "none" }}>🌀</div>
              <span className="text-xs text-slate-400 font-bold mt-3">Spinning</span>
            </button>

            {/* Bouncing stimulus */}
            <button
              onClick={() => handleTap("bouncing")}
              className={`h-44 rounded-3xl flex flex-col items-center justify-center border-4 transition-all duration-200 select-none
                ${feedback === "bouncing" ? "border-orange-400 bg-orange-50 scale-95" : "border-slate-100 bg-white hover:border-orange-300 shadow-md"}`}>
              <div style={{ transform: `translateY(${bounceY}px)`, fontSize: 56, transition: "none" }}>⚽</div>
              <span className="text-xs text-slate-400 font-bold mt-3">Bouncing</span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-300">Round {round + 1} / {ROUNDS}</p>
        </>
      )}

      {phase === "done" && (
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce-in inline-block">🎉</div>
          <h3 className="text-xl font-black text-slate-700 mb-2">Game 2 Complete!</h3>
          <div className="bg-slate-50 rounded-2xl p-4 mb-5 text-sm text-slate-500">
            Your child tapped <strong className="text-blue-600">spinning {taps.spinning}x</strong> and <strong className="text-orange-500">bouncing {taps.bouncing}x</strong>.
          </div>
          <button onClick={() => navigate("/game/3")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 text-white font-black text-base shadow-xl hover:scale-105 transition">
            Next: Motor Game →
          </button>
        </div>
      )}
    </Layout>
  );
}