import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-white/20">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2 text-purple-500 font-bold text-lg">
          <Sparkles size={20} />
          NeuroNest
        </div>

        <div className="flex gap-3">
          
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-full bg-white/70 text-slate-700 hover:scale-105 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/game")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 text-white hover:scale-105 transition"
          >
            Start Activity
          </button>

        </div>

      </div>
    </div>
  );
}