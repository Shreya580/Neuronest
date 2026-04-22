import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Analytics from "./components/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game1Social from "./pages/games/Game1Social";
import Game2Sensory from "./pages/games/Game2Sensory";
import Game3Motor from "./pages/games/Game3Motor";
import Questions from "./pages/Questions";
import Result from "./pages/Result";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-[#FFF9F0] via-[#F0F9FF] to-[#F5F0FF] min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-28">
        <Hero />
        <Features />
        <Analytics />
      </main>
      <footer className="border-t border-slate-100 py-10 text-center bg-white/50">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center text-lg">🧠</div>
          <span className="font-black text-lg text-slate-700">NeuroNest</span>
        </div>
        <p className="text-slate-400 text-sm mb-1">Built with ❤️ for Indian families · Inspired by START research (Dubey et al., 2024)</p>
        <p className="text-slate-300 text-xs">⚠️ Screening tool only — not a diagnostic instrument. Always consult a developmental pediatrician.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game/1" element={<Game1Social />} />
        <Route path="/game/2" element={<Game2Sensory />} />
        <Route path="/game/3" element={<Game3Motor />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}