import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/50 border-b border-white/30 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO — clicking always goes home */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center text-white text-lg font-black">
            N
          </div>
          <span className="font-black text-xl bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent">
            NeuroNest
          </span>
        </button>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-full text-slate-600 font-semibold text-sm hover:bg-white/60 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/game")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 text-white font-bold text-sm hover:scale-105 transition shadow-md shadow-sky-200"
          >
            Start Screening →
          </button>
        </div>

      </div>
    </div>
  );
}