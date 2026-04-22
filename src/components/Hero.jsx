import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black mb-6 border border-orange-200">
          🔬 Based on START Research · Dubey et al., 2024
        </div>
        <h1 className="text-5xl font-black text-slate-800 leading-[1.1] mb-5">
          Catch What Others{" "}
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Miss Early
          </span>
          <span className="block text-3xl text-slate-500 font-bold mt-2">Through the Power of Play 🎮</span>
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
          NeuroNest uses three science-backed games — testing <strong>social preference</strong>, <strong>sensory processing</strong>, and <strong>motor skills</strong> — to screen for early signs of autism in children aged <strong>1–6 years</strong>.
        </p>
        <button
          onClick={() => navigate("/game/1")}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-xl shadow-pink-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all">
          🚀 Start Free Screening — 5 mins
        </button>
        <div className="flex flex-wrap gap-3 mt-8">
          {[
            { icon: "🔬", text: "Research-backed" },
            { icon: "👨‍👩‍👧", text: "12,000+ families" },
            { icon: "🏥", text: "Pediatrician reviewed" },
            { icon: "🇮🇳", text: "Made for India" },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">
              <span>{b.icon}</span>{b.text}
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[420px] hidden md:block">
        {/* Domain cards */}
        <div className="animate-float-slow absolute top-0 right-0 bg-white p-5 rounded-3xl shadow-2xl shadow-purple-100 border border-slate-100 w-60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-2xl">👥</div>
            <div>
              <div className="font-black text-slate-700 text-sm">Social Domain</div>
              <div className="text-xs text-slate-400">Face vs shape preference</div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 w-[74%]" />
          </div>
          <div className="text-xs text-pink-600 font-bold mt-2">74% — Typical range ✓</div>
        </div>

        <div className="animate-float-fast absolute top-44 left-0 bg-white p-5 rounded-3xl shadow-xl shadow-sky-100 border border-slate-100 w-52" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl">🌀</div>
            <div>
              <div className="font-black text-slate-700 text-sm">Sensory Domain</div>
              <div className="text-xs text-slate-400">Repetitive stimuli</div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 w-[65%]" />
          </div>
          <div className="text-xs text-sky-600 font-bold mt-2">65% — Monitoring</div>
        </div>

        <div className="animate-float-slow absolute bottom-16 right-4 bg-white p-5 rounded-3xl shadow-xl border border-slate-100 w-56" style={{ animationDelay: "1s" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-2xl">✋</div>
            <div>
              <div className="font-black text-slate-700 text-sm">Motor Domain</div>
              <div className="text-xs text-slate-400">Precision & speed</div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-teal-500 w-[82%]" />
          </div>
          <div className="text-xs text-green-600 font-bold mt-2">82% — Excellent ✓</div>
        </div>

        <div className="animate-float-fast absolute bottom-4 left-8 bg-white px-4 py-3 rounded-2xl shadow-lg border border-green-100" style={{ animationDelay: "1.5s" }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="font-black text-green-600 text-sm">Low Risk</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">86% accuracy (START paper) ✓</div>
        </div>
      </div>
    </div>
  );
}