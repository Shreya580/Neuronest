import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Analytics from "./components/Analytics";
import Game from "./pages/Game";
import Questions from "./pages/Questions";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-[#FFF9F0] via-[#F0F9FF] to-[#F5F0FF] min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-28">
        <Hero />
        <Features />
        <Analytics />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/50 py-8 text-center text-slate-400 text-sm bg-white/30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🧠</span>
          <span className="font-black text-slate-600">NeuroNest</span>
        </div>
        <p>Built with ❤️ for Indian parents · Not a diagnostic tool · Always consult a pediatrician</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/game" element={<Game />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;