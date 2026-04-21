import { useNavigate } from "react-router-dom";

function Layout({ children, showBack = false, backTo = "/" }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] via-[#F0F9FF] to-[#F5F0FF] flex flex-col items-center justify-center px-4 py-12">

      {/* Logo — always clickable back to home */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-8 hover:opacity-75 transition-opacity"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center shadow-md">
          <span className="text-white text-xl">🧠</span>
        </div>
        <div>
          <span className="font-black text-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            NeuroNest
          </span>
          <div className="text-[9px] text-slate-400 font-semibold -mt-0.5 tracking-wide">EARLY DETECTION</div>
        </div>
      </button>

      {/* Card */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl shadow-purple-100/40 rounded-3xl p-8 w-full max-w-md border border-white/80">
        {showBack && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1 text-slate-400 text-sm font-semibold hover:text-slate-600 transition mb-5"
          >
            ← Back
          </button>
        )}
        {children}
      </div>

    </div>
  );
}

export default Layout;