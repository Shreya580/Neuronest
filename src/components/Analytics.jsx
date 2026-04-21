/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const navigate = useNavigate();

  const bars = [
    { label: "Social Interaction", pct: 78, color: "from-purple-400 to-purple-600" },
    { label: "Problem Solving", pct: 65, color: "from-sky-400 to-blue-500" },
    { label: "Language & Speech", pct: 55, color: "from-orange-400 to-pink-500" },
    { label: "Motor Skills", pct: 88, color: "from-green-400 to-teal-500" },
  ];

  return (
    <div>
      <div className="text-center mb-14">
        <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-xs font-black mb-4 border border-pink-200">
          📊 Sample Report Preview
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-3">
          What Your Report Looks Like
        </h2>
        <p className="text-slate-400 text-lg">Real insights, not just guesswork</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">

        {/* Left — big analytics panel */}
        <div className="md:col-span-3 bg-white rounded-3xl shadow-lg border-2 border-purple-100 p-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-slate-800 text-xl">Weekly Play Snapshot</h3>
            <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full">✅ Low Risk</span>
          </div>
          <p className="text-slate-400 text-sm mb-8">Sample Child · Age 3 · Last 7 days</p>

          <div className="space-y-5">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-black text-slate-600">{bar.label}</span>
                  <span className="text-sm font-bold text-slate-400">{bar.pct}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className={`bg-gradient-to-r ${bar.color} h-4 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-4">
            <p className="text-xs font-black text-slate-500 mb-3">📅 7-Day Activity</p>
            <div className="flex items-end gap-2 h-14">
              {[40, 75, 50, 95, 60, 85, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-md transition-all"
                    style={{
                      height: `${h}%`,
                      background: i === 3 ? "linear-gradient(180deg,#f97316,#a855f7)" : "#E2E8F0"
                    }} />
                  <span className="text-[9px] text-slate-400">
                    {["M","T","W","T","F","S","S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — two stacked cards */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* CTA */}
          <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-7 rounded-3xl shadow-xl text-white">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-black text-xl mb-2">Ready to Try It?</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-5">
              Takes only 5 minutes. No clinical appointment. No waiting. Free for all parents.
            </p>
            <button
              onClick={() => navigate("/game")}
              className="w-full py-3 rounded-2xl bg-white text-purple-600 font-black hover:scale-105 transition shadow-lg"
            >
              🎮 Start Screening Now
            </button>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-3xl shadow-lg border-2 border-orange-100 p-6">
            <p className="font-black text-slate-700 mb-4">🌟 Sample Milestones</p>
            {[
              { icon: "✅", text: "Responds to name", sub: "Met at age 1yr" },
              { icon: "🌟", text: "Uses 2-word sentences", sub: "Met at age 2yr" },
              { icon: "⏳", text: "Pretend play emerging", sub: "In progress · Age 3" },
              { icon: "🔔", text: "Sharing with peers", sub: "Needs attention" },
            ].map((m, i) => (
              <div key={i} className="flex gap-3 mb-3 last:mb-0">
                <span className="text-xl">{m.icon}</span>
                <div>
                  <div className="text-sm font-black text-slate-700">{m.text}</div>
                  <div className="text-xs text-slate-400">{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Testimonials marquee */}
      <div className="mt-16 overflow-hidden">
        <h3 className="text-xl font-black text-slate-700 text-center mb-8">💬 What Parents Say</h3>
        <div className="flex gap-5 animate-marquee w-max">
          {[
            { name: "Priya S., Pune", text: "NeuroNest helped me catch my son's speech delay at 18 months. Doctor confirmed it and we started therapy early!", avatar: "👩" },
            { name: "Amit K., Mumbai", text: "Finally something made for Indian parents. Simple, clear, no medical jargon.", avatar: "👨" },
            { name: "Sneha R., Hyderabad", text: "The games are so fun my daughter asks to play them every day. Meanwhile she's being screened!", avatar: "👩‍💼" },
            { name: "Rahul M., Delhi", text: "Got a moderate risk result, took it to our pediatrician, and he was impressed by the detail.", avatar: "🧑" },
            { name: "Kavya I., Chennai", text: "Best parenting app I've used. The milestone tracker is incredibly detailed.", avatar: "👩‍🍼" },
            { name: "Deepa V., Bengaluru", text: "Detected possible autism indicators in my 2yr old early. Changed everything for us.", avatar: "👩" },
            { name: "Priya S., Pune", text: "NeuroNest helped me catch my son's speech delay at 18 months. Doctor confirmed it and we started therapy early!", avatar: "👩" },
            { name: "Amit K., Mumbai", text: "Finally something made for Indian parents. Simple, clear, no medical jargon.", avatar: "👨" },
            { name: "Sneha R., Hyderabad", text: "The games are so fun my daughter asks to play them every day. Meanwhile she's being screened!", avatar: "👩‍💼" },
            { name: "Rahul M., Delhi", text: "Got a moderate risk result, took it to our pediatrician, and he was impressed by the detail.", avatar: "🧑" },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 min-w-[280px] max-w-[300px]">
              <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-pink-200 flex items-center justify-center text-xl">{t.avatar}</div>
                <span className="font-black text-slate-700 text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}