import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">

      {/* LEFT */}
      <div>
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black mb-6 border border-orange-200">
          ✨ AI-Powered Early Detection for Kids
        </div>

        <h1 className="text-5xl font-black text-slate-800 leading-[1.1] mb-5">
          Catch What Others{" "}
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Miss Early
          </span>
          <span className="block text-3xl text-slate-500 font-bold mt-2">
            Through the Power of Play 🎮
          </span>
        </h1>

        <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
          NeuroNest uses fun games and smart AI to help parents detect early signs of autism and developmental delays in children aged <strong>1–6 years</strong> — from home, in minutes.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-xl shadow-pink-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all"
          >
            🚀 Start Free — No signup needed
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mt-8">
          {[
            { icon: "👨‍👩‍👧", text: "12,000+ families" },
            { icon: "🏥", text: "Pediatrician reviewed" },
            { icon: "🇮🇳", text: "Made for India" },
            { icon: "🔒", text: "100% private" },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 border border-slate-100 shadow-sm">
              <span>{b.icon}</span>{b.text}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — floating cards */}
      <div className="relative h-[420px] hidden md:block">

        {/* Big card */}
        <div className="animate-float-slow absolute top-0 right-0 bg-white p-6 rounded-3xl shadow-2xl shadow-purple-100 border border-white w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
            <div>
              <div className="font-black text-slate-700 text-sm">Reaction Test</div>
              <div className="text-xs text-slate-400">Fine Motor · Age 3</div>
            </div>
          </div>
          <div className="text-3xl font-black text-slate-700 mb-1">78<span className="text-lg text-slate-400">%</span></div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 w-[78%]" />
          </div>
          <div className="text-xs text-green-600 font-bold mt-2">✅ On track for age 3</div>
        </div>

        {/* Weekly chart */}
        <div className="animate-float-fast absolute top-40 left-0 bg-white p-5 rounded-3xl shadow-xl shadow-sky-100 border border-white w-52" style={{ animationDelay: "0.5s" }}>
          <p className="text-xs font-black text-slate-500 mb-3">📊 Weekly Play Activity</p>
          <div className="flex items-end gap-1 h-12">
            {[30, 60, 45, 90, 55, 80, 65].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm transition-all"
                style={{ height: `${h}%`, background: i === 3 ? "linear-gradient(180deg,#f97316,#a855f7)" : "#E2E8F0" }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <span key={i} className="text-[9px] text-slate-400 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>

        {/* Achievement */}
        <div className="animate-float-slow absolute bottom-20 right-4 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-3xl shadow-xl border border-yellow-100 w-56" style={{ animationDelay: "1s" }}>
          <div className="flex items-center gap-3">
            <div className="text-3xl animate-wiggle">🏆</div>
            <div>
              <div className="font-black text-slate-700 text-sm">Arjun levelled up!</div>
              <div className="text-slate-400 text-xs">Mastered stacking ✨</div>
            </div>
          </div>
        </div>

        {/* Risk badge */}
        <div className="animate-float-fast absolute bottom-4 left-8 bg-white px-5 py-3 rounded-2xl shadow-lg border border-green-100" style={{ animationDelay: "1.5s" }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="font-black text-green-600 text-sm">Low Risk</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Healthy development ✓</div>
        </div>

      </div>
    </div>
  );
}