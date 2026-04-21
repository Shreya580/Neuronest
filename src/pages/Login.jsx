import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/game");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] via-[#F0F9FF] to-[#F5F0FF] flex flex-col items-center justify-center px-4">

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
          <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome Back 👋</h2>
          <p className="text-slate-400 text-sm">Log in to continue your child's journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="••••••••"
              required
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-700 font-semibold text-sm focus:outline-none focus:border-purple-300 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-slate-400 text-xs font-semibold">or continue as guest</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/game")}
          className="w-full py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-black text-sm hover:border-purple-300 hover:bg-purple-50 transition"
        >
          🎮 Try Without Account
        </button>

        <p className="text-center text-sm text-slate-400 mt-6">
          New here?{" "}
          <button onClick={() => navigate("/signup")} className="text-purple-600 font-black hover:underline">
            Create free account →
          </button>
        </p>

      </div>
    </div>
  );
}