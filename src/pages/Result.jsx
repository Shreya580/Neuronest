import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { computeRisk, loadGameData, clearAllData } from "../engine/scoring";

// Domain metadata
const DOMAIN_META = {
  social:        { label: "Social Preference",    icon: "👥", color: "from-pink-400 to-rose-500",    bg: "bg-pink-50",   border: "border-pink-200",  desc: "Face vs shape preference — lower score = reduced social stimulus preference (autism indicator)" },
  sensory:       { label: "Sensory Processing",   icon: "🌀", color: "from-sky-400 to-blue-500",     bg: "bg-sky-50",    border: "border-sky-200",   desc: "Repetitive vs novel stimuli — lower score = high fixation on repetitive stimuli (autism indicator)" },
  motor:         { label: "Fine Motor Skills",    icon: "✋", color: "from-green-400 to-teal-500",   bg: "bg-green-50",  border: "border-green-200", desc: "Target accuracy & speed — lower score = reduced motor precision (common in ASD + ID)" },
  questionnaire: { label: "Parent Report (M-CHAT-R)", icon: "📋", color: "from-orange-400 to-amber-500", bg: "bg-orange-50", border: "border-orange-200", desc: "10-item parent questionnaire based on M-CHAT-R developmental screening criteria" },
};

const CRITICAL_LABELS = { name: "responds to name", point: "pointing", eye: "eye contact" };

export default function Result() {
  const navigate = useNavigate();

  const childAge = parseInt(localStorage.getItem("childAge") || 3);
  const socialData    = loadGameData("social")    || { face: 5, shape: 5 };
  const sensoryData   = loadGameData("sensory")   || { spinning: 4, bouncing: 6 };
  const motorData     = loadGameData("motor")     || { score: 8, errors: 3 };
  const questionData  = loadGameData("questions") || {};

  const result = computeRisk({
    childAge,
    socialTaps:    socialData,
    sensoryTaps:   sensoryData,
    motorScore:    motorData.score || 0,
    motorErrors:   motorData.errors || 0,
    questionAnswers: questionData,
  });

  const { riskLevel, combinedPct, domains, criticalFail } = result;

  const RISK_UI = {
    low: {
      label: "Low Risk",
      icon: "✅",
      bg: "from-green-50 to-teal-50",
      border: "border-green-200",
      badge: "bg-green-100 text-green-700",
      barColor: "#22c55e",
      msg: "Your child's responses are within typical developmental ranges. Continue nurturing development through play, reading, and interaction.",
      steps: ["Continue monthly tracking with NeuroNest", "Read our age-appropriate activity guides", "Maintain routine pediatric check-ups"],
    },
    moderate: {
      label: "Moderate Risk",
      icon: "⚠️",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      barColor: "#f59e0b",
      msg: "Some responses suggest areas that may benefit from closer monitoring. This does not mean a diagnosis — but a professional check is advisable.",
      steps: ["Share this report with your pediatrician at the next visit", "Watch the flagged areas and note any changes", "Rescreen in 4 weeks"],
    },
    elevated: {
      label: "Elevated Risk — Please Act",
      icon: "🔔",
      bg: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
      badge: "bg-blue-100 text-blue-700",
      barColor: "#3b82f6",
      msg: "Multiple developmental indicators require professional evaluation. Early intervention is most effective. Please do not wait.",
      steps: ["See a developmental pediatrician within 2 weeks", "Contact NIMHANS helpline: 080-46110007", "Ask for early intervention assessment"],
    },
  };

  const ui = RISK_UI[riskLevel];

  return (
    <Layout>
      {/* Risk hero */}
      <div className={`bg-gradient-to-br ${ui.bg} rounded-2xl p-5 mb-5 border-2 ${ui.border} text-center`}>
        <div className="text-5xl mb-2">{ui.icon}</div>
        <div className={`inline-block px-5 py-1.5 rounded-full font-black text-sm ${ui.badge} mb-3`}>{ui.label}</div>
        <p className="text-slate-600 text-sm leading-relaxed">{ui.msg}</p>
      </div>

      {/* Critical flags */}
      {criticalFail.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-5">
          <p className="font-black text-red-700 text-sm mb-2">⚠️ Critical M-CHAT-R Items Failed</p>
          {criticalFail.map(k => (
            <div key={k} className="flex items-center gap-2 text-xs text-red-600 font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              No response for: <strong>{CRITICAL_LABELS[k] || k}</strong>
            </div>
          ))}
          <p className="text-xs text-red-400 mt-2">Failing critical items alone is significant — professional evaluation is recommended.</p>
        </div>
      )}

      {/* Overall score bar */}
      <div className="bg-slate-50 rounded-2xl p-5 mb-5 border border-slate-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-black text-slate-600">Overall Developmental Score</span>
          <span className="text-sm font-black" style={{ color: ui.barColor }}>{combinedPct}%</span>
        </div>
        <div className="bg-slate-200 rounded-full h-5 overflow-hidden mb-1">
          <div className="h-5 rounded-full transition-all duration-1000"
            style={{ width: `${combinedPct}%`, background: `linear-gradient(90deg, ${ui.barColor}88, ${ui.barColor})` }} />
        </div>
        <p className="text-xs text-slate-400">Combined score from 3 games + 10 parent questions</p>
      </div>

      {/* Domain breakdown */}
      <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-slate-100">
        <p className="font-black text-slate-700 text-sm mb-4">📊 Domain Breakdown (START-based)</p>
        <div className="space-y-4">
          {Object.entries(domains).map(([key, pct]) => {
            const meta = DOMAIN_META[key];
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{meta.icon}</span>
                    <span className="text-sm font-black text-slate-700">{meta.label}</span>
                  </div>
                  <span className="text-sm font-black text-slate-500">{pct}%</span>
                </div>
                <div className={`${meta.bg} rounded-full h-3 overflow-hidden border ${meta.border}`}>
                  <div className={`bg-gradient-to-r ${meta.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{meta.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-purple-100">
        <p className="font-black text-slate-700 text-sm mb-3">📋 Recommended Next Steps</p>
        {ui.steps.map((s, i) => (
          <div key={i} className="flex gap-3 mb-3 last:mb-0 items-start">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 text-white text-xs flex items-center justify-center font-black flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <span className="text-sm text-slate-600 font-semibold leading-snug">{s}</span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-5 border border-purple-100 text-xs text-slate-500 leading-relaxed">
        <strong>⚠️ Important:</strong> NeuroNest is inspired by the START research tool (Dubey et al., 2024, <em>Autism</em> journal). It is a <strong>screening instrument only</strong> — not a clinical diagnosis. Only a qualified developmental pediatrician or child psychologist can diagnose autism or related conditions.
      </div>

      <button onClick={() => navigate("/")}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base hover:scale-[1.02] transition shadow-lg mb-3">
        🏠 Return Home
      </button>
      <button onClick={() => { clearAllData(); navigate("/game/1"); }}
        className="w-full py-3 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold text-sm hover:border-purple-300 hover:bg-purple-50 transition">
        🔄 Retake Full Screening
      </button>
    </Layout>
  );
}