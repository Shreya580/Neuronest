import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childAge, setChildAge] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/game");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] via-[#F0F9FF] to-[#F5F0FF] flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-8 hover:opacity-75 transition">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl">🧠</span>
        </div>
        <div>
          <div className="font-black text-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">NeuroNest</div>
          <div className="text-[10px] text-slate-400 font-bold tracking-widest">EARLY DETECTION</div>
        </div>
      </button>

      <div className="bg-white/90 backdrop-blur-md shadow-2xl shadow-purple-100 rounded-3xl p-8 w-full max-w-md border border-white/80">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌟</div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Create Your Account</h2>
          <p className="text-slate-400 text-sm">Join 12,000+ parents detecting delays early</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-black text-slate-600 mb-2">👤 Your Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              required
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-700 font-semibold text-sm focus:outline-none focus:border-purple-300 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-600 mb-2">👶 Child's Age</label>
            <select
              value={childAge}
              onChange={e => setChildAge(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-700 font-semibold text-sm focus:outline-none focus:border-purple-300 focus:bg-white transition"
            >
              <option value="">Select age</option>
              {["1 year", "2 years", "3 years", "4 years", "5 years", "6 years"].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-black text-slate-600 mb-2">📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="parent@email.com"
              required
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-700 font-semibold text-sm focus:outline-none focus:border-purple-300 focus:bg-white transition"
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-600 mb-2">🔒 Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-700 font-semibold text-sm focus:outline-none focus:border-purple-300 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "🚀 Create Free Account"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
          By signing up, you agree that NeuroNest is a <strong>screening tool only</strong>, not a diagnostic tool.
        </p>

        <p className="text-center text-sm text-slate-400 mt-4">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-purple-600 font-black hover:underline">
            Log in →
          </button>
        </p>

      </div>
    </div>
  );
}