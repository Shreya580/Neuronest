import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { saveGameData } from "../../engine/scoring";

// Fine motor task: moving target, measures spatial accuracy and reaction time
// Based on START "motor following task" (Dubey et al., 2024)
// Key metrics: hits (accuracy) and miss count (errors)

const DURATION = 20; // seconds
const TARGET_SIZE = 72; // px

export default function Game3Motor() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("intro");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [pos, setPos] = useState({ x: 130, y: 100 });
  const [flash, setFlash] = useState(false);
  const arenaRef = useRef(null);
  const finishedRef = useRef(false);

  // Move target every 1.8s
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      const arena = arenaRef.current;
      if (!arena) return;
      const w = arena.clientWidth - TARGET_SIZE - 10;
      const h = arena.clientHeight - TARGET_SIZE - 10;
      setPos({ x: Math.floor(Math.random() * w) + 5, y: Math.floor(Math.random() * h) + 5 });
    }, 1800);
    return () => clearInterval(id);
  }, [phase]);

  // Countdown
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        saveGameData("motor", { score: hits, errors: misses });
        setPhase("done");
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft, hits, misses]);

  function handleHit(e) {
    e.stopPropagation();
    if (phase !== "playing") return;
    setHits(h => h + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  }

  function handleMiss() {
    if (phase !== "playing") return;
    setMisses(m => m + 1);
  }

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;

  return (
    <Layout step={3} totalSteps={4}>
      <div className="text-center mb-5">
        <span className="inline-block bg-gradient-to-r from-green-100 to-teal-100 text-green-600 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-green-200">
          🎮 Game 3 of 3 · Motor Skills
        </span>
        <h2 className="text-2xl font-black text-slate-800">Catch the star! ⭐</h2>
        <p className="text-slate-400 text-sm mt-1">Tap the moving star as fast as you can!</p>
      </div>

      {phase === "intro" && (
        <div className="text-center">
          <div className="text-7xl mb-5 animate-wiggle inline-block">⭐</div>
          <div className="bg-green-50 rounded-2xl p-5 mb-6 border border-green-100 text-sm text-slate-600 leading-relaxed">
            <strong>How to play:</strong> A star will jump around. Let your child try to tap it as many times as possible in <strong>20 seconds!</strong><br /><br />
            <span className="text-xs text-slate-400">This measures fine motor precision and spatial tracking ability.</span>
          </div>
          <button onClick={() => { finishedRef.current = false; setPhase("playing"); }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-black text-lg shadow-xl hover:scale-105 transition">
            🚀 Start!
          </button>
        </div>
      )}

      {phase === "playing" && (
        <>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-green-50 rounded-2xl py-2.5 text-center border border-green-100">
              <div className="text-2xl font-black text-green-600">{hits}</div>
              <div className="text-xs text-slate-400">Hits ✓</div>
            </div>
            <div className="flex-1 bg-orange-50 rounded-2xl py-2.5 text-center border border-orange-100">
              <div className={`text-2xl font-black ${timeLeft <= 5 ? "text-red-500" : "text-orange-500"}`}>{timeLeft}s</div>
              <div className="text-xs text-slate-400">Time Left</div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-2xl py-2.5 text-center border border-slate-100">
              <div className="text-2xl font-black text-slate-500">{accuracy}%</div>
              <div className="text-xs text-slate-400">Accuracy</div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
            <div className="h-2.5 rounded-full bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-1000"
              style={{ width: `${(timeLeft / DURATION) * 100}%` }} />
          </div>

          {/* Arena */}
          <div
            ref={arenaRef}
            onClick={handleMiss}
            className="relative bg-gradient-to-br from-green-50 via-teal-50 to-sky-50 rounded-3xl border-2 border-dashed border-green-200 overflow-hidden"
            style={{ height: 200 }}>
            <button
              onClick={handleHit}
              className={`absolute flex items-center justify-center rounded-full text-4xl select-none transition-all duration-300 cursor-pointer
                ${flash ? "scale-125 opacity-60" : "hover:scale-110"}`}
              style={{
                width: TARGET_SIZE, height: TARGET_SIZE,
                left: pos.x, top: pos.y,
                background: flash ? "radial-gradient(circle, #fbbf24, #f97316)" : "radial-gradient(circle, #fde68a, #fbbf24)",
                boxShadow: flash ? "0 0 30px rgba(251,191,36,0.8)" : "0 4px 20px rgba(251,191,36,0.4)",
                border: "3px solid #f59e0b",
              }}>
              ⭐
            </button>
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-slate-300 font-semibold">Tap the star!</p>
          </div>
        </>
      )}

      {phase === "done" && (
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce-in inline-block">🎉</div>
          <h3 className="text-xl font-black text-slate-700 mb-2">All Games Done!</h3>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-green-50 rounded-2xl p-3 text-center border border-green-100">
              <div className="text-2xl font-black text-green-600">{hits}</div>
              <div className="text-xs text-slate-400">Hits</div>
            </div>
            <div className="bg-red-50 rounded-2xl p-3 text-center border border-red-100">
              <div className="text-2xl font-black text-red-400">{misses}</div>
              <div className="text-xs text-slate-400">Misses</div>
            </div>
            <div className="bg-sky-50 rounded-2xl p-3 text-center border border-sky-100">
              <div className="text-2xl font-black text-sky-600">{accuracy}%</div>
              <div className="text-xs text-slate-400">Accuracy</div>
            </div>
          </div>
          <button onClick={() => navigate("/questions")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-xl hover:scale-105 transition">
            Next: 10 Quick Questions →
          </button>
        </div>
      )}
    </Layout>
  );
}