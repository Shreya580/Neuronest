import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { saveGameData } from "../../engine/scoring";

const ROUND_COUNT = 12;

const PAIRS = [
  { social: "😊", nonsocial: "🔷", socialLabel: "Happy face", nonsocialLabel: "Blue shape" },
  { social: "👩", nonsocial: "⭐", socialLabel: "Person", nonsocialLabel: "Star" },
  { social: "😄", nonsocial: "🟣", socialLabel: "Laughing face", nonsocialLabel: "Circle" },
  { social: "👶", nonsocial: "🔺", socialLabel: "Baby", nonsocialLabel: "Triangle" },
  { social: "🤗", nonsocial: "🟦", socialLabel: "Friendly face", nonsocialLabel: "Square" },
  { social: "👦", nonsocial: "🌟", socialLabel: "Child", nonsocialLabel: "Star" },
  { social: "😀", nonsocial: "💠", socialLabel: "Smiley", nonsocialLabel: "Diamond" },
  { social: "👩‍👧", nonsocial: "🔶", socialLabel: "Parent & child", nonsocialLabel: "Orange shape" },
  { social: "🙂", nonsocial: "🔘", socialLabel: "Calm face", nonsocialLabel: "Round shape" },
  { social: "👨", nonsocial: "🌐", socialLabel: "Person", nonsocialLabel: "Globe pattern" },
  { social: "😍", nonsocial: "🔲", socialLabel: "Face", nonsocialLabel: "Pattern" },
  { social: "🧒", nonsocial: "🌀", socialLabel: "Child face", nonsocialLabel: "Spiral" },
];

export default function Game1Social() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro");
  const [round, setRound] = useState(0);
  const [taps, setTaps] = useState({ face: 0, shape: 0 });
  const [feedback, setFeedback] = useState(null);

  // ✅ FIX: flipped state initialized once
  const [flipped, setFlipped] = useState(() => Math.random() > 0.5);

  const pairs = PAIRS.slice(0, ROUND_COUNT);
  const pair = pairs[round] || pairs[0];

  function handleTap(type) {
    if (feedback) return;

    setFeedback(type);

    const updated = { ...taps, [type]: taps[type] + 1 };
    setTaps(updated);

    setTimeout(() => {
      setFeedback(null);

      if (round + 1 >= ROUND_COUNT) {
        saveGameData("social", updated);
        setPhase("done");
      } else {
        // ✅ FIX: update both round + flipped together
        setRound((r) => {
          const nextRound = r + 1;
          setFlipped(Math.random() > 0.5);
          return nextRound;
        });
      }
    }, 600);
  }

  return (
    <Layout step={1} totalSteps={4}>
      <div className="text-center mb-5">
        <span className="inline-block bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-black mb-3 border border-pink-200">
          🎮 Game 1 of 3 · Social Preference
        </span>
        <h2 className="text-2xl font-black text-slate-800">Which one do you like? 👀</h2>
        <p className="text-slate-400 text-sm mt-1">Let your child tap their favourite!</p>
      </div>

      {phase === "intro" && (
        <div className="text-center">
          <div className="text-7xl mb-5 animate-wiggle inline-block">👥</div>
          <div className="bg-pink-50 rounded-2xl p-5 mb-6 border border-pink-100 text-sm text-slate-600 leading-relaxed">
            <strong>How to play:</strong> Two pictures will appear. Let your child tap the one they like most.
          </div>

          <button
            onClick={() => setPhase("playing")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-black text-lg shadow-xl hover:scale-105 transition"
          >
            🚀 Start!
          </button>
        </div>
      )}

      {phase === "playing" && (
        <>
          <div className="mb-5">
            <div className="flex justify-between mb-2 text-xs font-bold text-slate-400">
              <span>Round {round + 1} of {ROUND_COUNT}</span>
              <span>{Math.round((round / ROUND_COUNT) * 100)}% done</span>
            </div>

            <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300"
                style={{ width: `${(round / ROUND_COUNT) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {(flipped
              ? [
                  { type: "shape", emoji: pair.nonsocial, label: pair.nonsocialLabel },
                  { type: "face", emoji: pair.social, label: pair.socialLabel },
                ]
              : [
                  { type: "face", emoji: pair.social, label: pair.socialLabel },
                  { type: "shape", emoji: pair.nonsocial, label: pair.nonsocialLabel },
                ]
            ).map(({ type, emoji, label }) => (
              <button
                key={type}
                onClick={() => handleTap(type)}
                className={`aspect-square rounded-3xl flex flex-col items-center justify-center text-6xl border-4 transition-all duration-200
                  ${
                    feedback === type
                      ? "border-purple-400 bg-purple-50 scale-95"
                      : "border-slate-100 bg-white hover:border-pink-300 hover:bg-pink-50 hover:scale-105"
                  }`}
              >
                {emoji}
                <span className="text-[10px] text-slate-400 font-bold mt-2">{label}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-slate-300">
            Round {round + 1} / {ROUND_COUNT}
          </p>
        </>
      )}

      {phase === "done" && (
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-black text-slate-700 mb-2">Game 1 Complete!</h3>

          <div className="bg-slate-50 rounded-2xl p-4 mb-5 text-sm text-slate-500">
            Your child tapped <strong className="text-pink-600">{taps.face} faces</strong> and{" "}
            <strong className="text-slate-600">{taps.shape} shapes</strong>.
          </div>

          <button
            onClick={() => navigate("/game/2")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white font-black"
          >
            Next: Sensory Game →
          </button>
        </div>
      )}
    </Layout>
  );
}