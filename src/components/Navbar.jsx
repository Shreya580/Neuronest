import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-white/50 shadow-sm shadow-purple-100/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5 hover:opacity-80 transition">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center shadow-md shadow-orange-200 text-xl">
            🧠
          </div>
          <div className="text-left">
            <div className="font-black text-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-none">
              NeuroNest
            </div>
            <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Early Detection</div>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full text-slate-600 font-bold text-sm hover:bg-slate-100 transition">
            Log In
          </button>
          <button onClick={() => navigate("/game/1")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-black text-sm shadow-lg shadow-pink-200/50 hover:scale-105 hover:shadow-xl transition">
            Start Screening →
          </button>
        </div>
      </div>
    </nav>
  );
}