import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Result() {
  const navigate = useNavigate();

  const gameScore = parseInt(localStorage.getItem("gameScore") || 0);
  const questionScore = parseInt(localStorage.getItem("questionScore") || 0);
  const questionMax = parseInt(localStorage.getItem("questionMax") || 10);

  // Normalise game score (max ~20 taps in 15s is excellent)
  const gameNorm = Math.min(gameScore / 20, 1); // 0 to 1
  const qNorm = questionScore / questionMax; // 0 to 1
  const combinedPct = Math.round((gameNorm * 0.35 + qNorm * 0.65) * 100);

  let risk;
  if (combinedPct >= 65) {
    risk = {
      level: "Low Risk",
      icon: "✅",
      emoji: "🌈",
      gradFrom: "#22c55e", gradTo: "#16a34a",
      bg: "from-green-50 to-teal-50",
      border: "border-green-200",
      badge: "bg-green-100 text-green-700",
      msg: "Your child's responses are within healthy developmental ranges for their age. Keep nurturing them through play, reading, and interaction!",
      next: ["Continue monthly tracking with NeuroNest", "Read our age-appropriate activity guides", "Schedule your next routine pediatric check-up"],
    };
  } else if (combinedPct >= 40) {
    risk = {
      level: "Moderate Risk",
      icon: "⚠️",
      emoji: "🔍",
      gradFrom: "#f59e0b", gradTo: "#d97706",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      msg: "Some responses suggest areas that may benefit from closer attention. This doesn't mean something is wrong — but we recommend a professional check.",
      next: ["Share this report with your child's pediatrician", "Begin speech or play therapy if recommended", "Rescreen in 4 weeks after working on flagged areas"],
    };
  } else {
    risk = {
      level: "Elevated Risk — Act Now",
      icon: "🔔",
      emoji: "💙",
      gradFrom: "#3b82f6", gradTo: "#6366f1",
      bg: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
      badge: "bg-blue-100 text-blue-700",
      msg: "Your child's responses indicate multiple developmental indicators that need professional evaluation. Early action is the most effective action — please don't wait.",
      next: ["See a developmental pediatrician within 2 weeks", "Contact NIMHANS or a certified child psychologist", "Start early intervention — it makes a huge difference"],
    };
  }

  const pctColor = combinedPct >= 65 ? "#22c55e" : combinedPct >= 40 ? "#f59e0b" : "#3b82f6";

  return (
    <Layout>
      {/* Hero result */}
      <div className={`bg-gradient-to-br ${risk.bg} rounded-2xl p-5 mb-5 border-2 ${risk.border} text-center`}>
        <div className="text-5xl mb-2">{risk.icon}</div>
        <div className={`inline-block px-5 py-1.5 rounded-full font-black text-sm ${risk.badge} mb-3`}>
          {risk.level}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{risk.msg}</p>
      </div>

      {/* Score breakdown */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-5 border border-slate-100">
        <p className="font-black text-slate-700 text-sm mb-4">📊 Score Breakdown</p>

        {/* Combined score bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs font-black text-slate-500">Overall Developmental Score</span>
            <span className="text-xs font-black" style={{ color: pctColor }}>{combinedPct}%</span>
          </div>
          <div className="bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-1000"
              style={{ width: `${combinedPct}%`, background: `linear-gradient(90deg, ${risk.gradFrom}, ${risk.gradTo})` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-100">
            <div className="text-3xl font-black text-purple-600">{gameScore}</div>
            <div className="text-xs text-slate-400 mt-1 font-semibold">Game Taps</div>
            <div className="text-xs text-slate-300">(attention test)</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-100">
            <div className="text-3xl font-black text-orange-500">{questionScore}/{questionMax}</div>
            <div className="text-xs text-slate-400 mt-1 font-semibold">Milestone Points</div>
            <div className="text-xs text-slate-300">(behaviour check)</div>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-purple-100">
        <p className="font-black text-slate-700 text-sm mb-3">📋 Recommended Next Steps</p>
        {risk.next.map((step, i) => (
          <div key={i} className="flex gap-3 mb-3 last:mb-0 items-start">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 text-white text-xs flex items-center justify-center font-black flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <span className="text-sm text-slate-600 font-semibold leading-snug">{step}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-5 border border-purple-100 text-xs text-slate-500 leading-relaxed">
        <strong>⚠️ Important:</strong> NeuroNest is a <strong>screening tool only</strong> — not a diagnosis. Results are based on parent-reported answers and a game score. Only a qualified developmental pediatrician can provide a medical diagnosis.
      </div>

      {/* Buttons */}
      <button
        onClick={() => navigate("/")}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base hover:scale-[1.02] transition shadow-lg mb-3"
      >
        🏠 Return Home
      </button>
      <button
        onClick={() => { localStorage.clear(); navigate("/game"); }}
        className="w-full py-3 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold text-sm hover:border-purple-300 hover:bg-purple-50 transition"
      >
        🔄 Retake Screening
      </button>
    </Layout>
  );
}