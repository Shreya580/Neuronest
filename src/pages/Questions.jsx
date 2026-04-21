import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

// These questions are based on real M-CHAT and CDC developmental screening criteria
const questions = [
  {
    key: "name",
    q: "Does your child turn or look at you when you call their name?",
    why: "Responding to name is a core early autism indicator (M-CHAT item)"
  },
  {
    key: "eye",
    q: "Does your child make eye contact with you during play or feeding?",
    why: "Eye contact development is a key social communication milestone"
  },
  {
    key: "point",
    q: "Does your child point at objects to show you something interesting?",
    why: "Pointing (joint attention) is one of the strongest early autism indicators"
  },
  {
    key: "pretend",
    q: "Does your child engage in pretend play (feeding a doll, pretending to talk on phone)?",
    why: "Pretend play reflects symbolic thinking and social development"
  },
  {
    key: "social",
    q: "Does your child smile or laugh when you smile or play with them?",
    why: "Social smiling is a fundamental early social-emotional milestone"
  },
];

const options = [
  { label: "Always / Often", emoji: "😊", val: "yes", score: 2 },
  { label: "Sometimes", emoji: "🤔", val: "partial", score: 1 },
  { label: "Rarely", emoji: "😟", val: "no", score: 0 },
  { label: "Never", emoji: "❌", val: "never", score: 0 },
];

export default function Questions() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  function handleNext() {
    if (selected === null) return;
    const updated = { ...answers, [questions[step].key]: selected };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected(null);
    } else {
      // Calculate score: sum of all option scores
      const totalScore = Object.values({ ...updated }).reduce((acc, opt) => {
        const match = options.find(o => o.label === opt);
        return acc + (match ? match.score : 0);
      }, 0);
      localStorage.setItem("questionScore", totalScore);
      localStorage.setItem("questionMax", questions.length * 2);
      navigate("/result");
    }
  }

  return (
    <Layout showBack backTo="/game">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-black text-purple-500">Question {step + 1} of {questions.length}</span>
          <span className="text-xs text-slate-400 font-bold">{Math.round(((step + 1) / questions.length) * 100)}% done</span>
        </div>
        <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 transition-all duration-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-5 mb-5 border border-orange-100">
        <h2 className="text-lg font-black text-slate-800 leading-snug mb-2">
          {questions[step].q}
        </h2>
        <p className="text-xs text-slate-400 italic">💡 {questions[step].why}</p>
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-3 mb-5">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setSelected(opt.label)}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left font-bold text-slate-700 text-sm transition-all
              ${selected === opt.label
                ? "border-purple-400 bg-purple-50 shadow-md shadow-purple-100"
                : "border-slate-100 bg-white hover:border-orange-300 hover:bg-orange-50"
              }`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            {opt.label}
            {selected === opt.label && <span className="ml-auto text-purple-500">✓</span>}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={selected === null}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-lg hover:scale-[1.02] transition disabled:opacity-40 disabled:scale-100"
      >
        {step < questions.length - 1 ? "Next Question →" : "See My Results 📊"}
      </button>

      {step > 0 && (
        <button
          onClick={() => { setStep(s => s - 1); setSelected(null); }}
          className="mt-3 w-full py-3 text-slate-400 text-sm font-semibold hover:text-slate-600 transition"
        >
          ← Previous Question
        </button>
      )}
    </Layout>
  );
}