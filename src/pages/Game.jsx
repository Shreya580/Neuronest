import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [bubblePos, setBubblePos] = useState({ top: "35%", left: "35%" });

  const finishedRef = useRef(false); // 🔥 prevents repeated state updates
  const navigate = useNavigate();

  // Countdown
  useEffect(() => {
    if (!started || finished) return;

    const id = setTimeout(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearTimeout(id);
  }, [started, timeLeft, finished]);

  // Finish logic (FIXED properly)
  useEffect(() => {
    if (!started) return;

    if (timeLeft <= 0 && !finishedRef.current) {
      finishedRef.current = true; // 🚫 prevents loop
      setFinished(true);
      localStorage.setItem("gameScore", score);
    }
  }, [timeLeft, started, score]);

  // Move bubble to a random position on each tap
  function handleTap() {
    if (!started || finished) return;
    setScore((s) => s + 1);

    const top = Math.floor(Math.random() * 50) + 15;
    const left = Math.floor(Math.random() * 50) + 15;

    setBubblePos({ top: `${top}%`, left: `${left}%` });
  }

  function getScoreMessage() {
    if (score >= 15) return { msg: "Excellent attention span! 🌟", color: "text-green-600" };
    if (score >= 8) return { msg: "Good response speed! 👍", color: "text-sky-600" };
    return { msg: "Keep practising together! 💪", color: "text-orange-500" };
  }

  return (
    <Layout showBack backTo="/">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-orange-200">
          🎮 Game 1 of 1 · Reaction Test
        </span>
        <h2 className="text-2xl font-black text-slate-800">Pop the Bubble! 🫧</h2>
        <p className="text-slate-400 text-sm mt-1">
          Let your child tap the moving bubble as fast as they can
        </p>
      </div>

      {/* Not started */}
      {!started && !finished && (
        <div className="text-center">
          <div className="text-7xl mb-5 animate-wiggle inline-block">🎯</div>
          <div className="bg-orange-50 rounded-2xl p-4 mb-6 text-sm text-slate-600 leading-relaxed border border-orange-100">
            <strong>How to play:</strong> Tap the glowing bubble as many times as you can in <strong>15 seconds</strong>.
          </div>

          <button
            onClick={() => {
              finishedRef.current = false; // reset flag
              setStarted(true);
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-lg shadow-xl hover:scale-105 transition"
          >
            🚀 Let's Play!
          </button>
        </div>
      )}

      {/* Game active */}
      {started && !finished && (
        <>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-purple-50 rounded-2xl py-3 text-center border border-purple-100">
              <div className="text-3xl font-black text-purple-600">{score}</div>
              <div className="text-xs text-slate-400 font-semibold">Score</div>
            </div>

            <div className="flex-1 bg-orange-50 rounded-2xl py-3 text-center border border-orange-100">
              <div className={`text-3xl font-black ${timeLeft <= 5 ? "text-red-500" : "text-orange-500"}`}>
                {timeLeft}s
              </div>
              <div className="text-xs text-slate-400 font-semibold">Time Left</div>
            </div>
          </div>

          {/* Timer bar */}
          <div className="bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${(timeLeft / 15) * 100}%`,
                background:
                  timeLeft <= 5
                    ? "linear-gradient(90deg,#ef4444,#f97316)"
                    : "linear-gradient(90deg,#f97316,#a855f7)"
              }}
            />
          </div>

          {/* Bubble arena */}
          <div
            className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-3xl border-2 border-dashed border-purple-200 overflow-hidden"
            style={{ height: 220 }}
            onClick={handleTap}
          >
            <div
              className="absolute w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{
                top: bubblePos.top,
                left: bubblePos.left,
                transform: "translate(-50%, -50%)"
              }}
            >
              🫧
            </div>
          </div>
        </>
      )}

      {/* Game over */}
      {finished && (
        <div className="text-center">
          <div className="text-6xl mb-3">🎉</div>
          <div className="text-5xl font-black text-purple-600 mb-1">{score}</div>
          <p className="text-slate-400 text-sm mb-2">bubbles popped!</p>

          <p className={`font-black text-base mb-6 ${getScoreMessage().color}`}>
            {getScoreMessage().msg}
          </p>

          <button
            onClick={() => navigate("/questions")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base mb-3"
          >
            Next: Questions →
          </button>

          <button
            onClick={() => {
              finishedRef.current = false;
              setScore(0);
              setTimeLeft(15);
              setStarted(false);
              setFinished(false);
            }}
            className="w-full py-3 rounded-2xl border text-slate-500"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </Layout>
  );
}