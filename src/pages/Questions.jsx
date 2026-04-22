import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { saveGameData } from "../engine/scoring";

// Full M-CHAT-R (10 items) — critical items flagged
const questions = [
  { key: "name",    critical: true,  q: "If you call your child's name, do they look up at you?", why: "⚠️ Critical — Name response is the strongest single M-CHAT-R indicator" },
  { key: "point",   critical: true,  q: "Does your child point with their index finger to ask for something or show interest?", why: "⚠️ Critical — Pointing (joint attention) is a primary autism early marker" },
  { key: "eye",     critical: true,  q: "Does your child make eye contact with you?", why: "⚠️ Critical — Eye contact is a core social communication milestone" },
  { key: "walk",    critical: false, q: "Does your child walk by themselves (or try to)?", why: "Motor milestone — typically achieved by 15–18 months" },
  { key: "pretend", critical: false, q: "Does your child engage in pretend play (e.g. feeding a toy, using a banana as a phone)?", why: "Symbolic play reflects cognitive and social development" },
  { key: "copy",    critical: false, q: "Does your child copy or imitate what you do (e.g. wave, clap)?", why: "Imitation is a fundamental social learning mechanism" },
  { key: "response",critical: false, q: "Does your child respond when you smile at them by smiling back?", why: "Social reciprocity — fundamental emotional milestone" },
  { key: "unusual", critical: false, q: "Does your child do unusual things with their hands (flapping, spinning fingers)?", why: "Repetitive motor behaviours are a diagnostic criterion for autism" },
  { key: "interest",critical: false, q: "Does your child seem interested in other children (watching or playing with them)?", why: "Social motivation — typical children show interest in peers" },
  { key: "comfort", critical: false, q: "Does your child come to you for comfort when hurt or upset?", why: "Seeking comfort = typical attachment and social bond" },
];

// Scoring: Always/Often = 2, Sometimes = 1, Rarely/Never = 0
// EXCEPT Q8 (unusual) — reversed: Always = 0, Never = 2
const REVERSED_ITEMS = ["unusual"];

const options = [
  { label: "Always / Often", emoji: "😊", raw: 2 },
  { label: "Sometimes",      emoji: "🤔", raw: 1 },
  { label: "Rarely",         emoji: "😟", raw: 0 },
  { label: "Never",          emoji: "❌", raw: 0 },
];

export default function Questions() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const q = questions[step];

  function getScore(key, raw) {
    return REVERSED_ITEMS.includes(key) ? 2 - raw : raw;
  }

  function handleNext() {
    if (selected === null) return;
    const score = getScore(q.key, selected.raw);
    const updated = { ...answers, [q.key]: score };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(s => s + 1);
      setSelected(null);
    } else {
      saveGameData("questions", updated);
      navigate("/result");
    }
  }

  return (
    <Layout step={4} totalSteps={4}>
      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-black text-purple-500">Question {step + 1} of {questions.length}</span>
          <div className="flex items-center gap-1">
            {q.critical && <span className="bg-red-100 text-red-600 text-[9px] font-black px-2 py-0.5 rounded-full">CRITICAL</span>}
            <span className="text-xs text-slate-400">{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
        </div>
        <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
          <div className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 transition-all duration-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className={`rounded-2xl p-5 mb-5 border ${q.critical ? "bg-red-50 border-red-200" : "bg-gradient-to-br from-orange-50 to-pink-50 border-orange-100"}`}>
        <h2 className="text-lg font-black text-slate-800 leading-snug mb-2">{q.q}</h2>
        <p className="text-xs text-slate-400 italic">{q.why}</p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-5">
        {options.map((opt) => (
          <button key={opt.label}
            onClick={() => setSelected(opt)}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left font-bold text-slate-700 text-sm transition-all
              ${selected?.label === opt.label
                ? "border-purple-400 bg-purple-50 shadow-md"
                : "border-slate-100 bg-white hover:border-orange-300 hover:bg-orange-50"}`}>
            <span className="text-2xl">{opt.emoji}</span>
            {opt.label}
            {selected?.label === opt.label && <span className="ml-auto text-purple-500 font-black">✓</span>}
          </button>
        ))}
      </div>

      <button onClick={handleNext} disabled={selected === null}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-lg hover:scale-[1.02] transition disabled:opacity-40 disabled:scale-100">
        {step < questions.length - 1 ? "Next Question →" : "See My Results 📊"}
      </button>

      {step > 0 && (
        <button onClick={() => { setStep(s => s - 1); setSelected(null); }}
          className="mt-3 w-full py-3 text-slate-400 text-sm font-semibold hover:text-slate-600 transition">
          ← Previous
        </button>
      )}
    </Layout>
  );
}