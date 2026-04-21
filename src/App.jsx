import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Analytics from "./components/Analytics";

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Analytics />
    </>
  );
}

function Dashboard() {
  return <div className="pt-32 text-center">Dashboard Coming Soon</div>;
}

function Game() {
  return <div className="pt-32 text-center">Game Screen</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-br from-[#E1F8EF] via-[#E0F2FE] to-[#F3E8FF] min-h-screen">

        <Navbar />

        <main className="max-w-6xl mx-auto px-6 pt-24 space-y-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;