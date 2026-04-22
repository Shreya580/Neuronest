import { Brain, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();
  const ages = [1, 2, 3, 4, 5, 6];

  const cards = [
    {
      icon: <Brain size={24} className="text-white" />,
      iconBg: "from-green-400 to-teal-500",
      cardBorder: "border-green-100",
      title: "🎮 Play-Based Screening",
      desc: "Your child plays fun games while our AI quietly observes attention span, response time, and interaction patterns.",
      tags: ["Attention", "Memory", "Focus"],
      tagColor: "bg-green-100 text-green-700",
      onClick: () => navigate("/game/1"),
      cta: "Start screening →",
      ctaColor: "text-green-600",
    },
    {
      icon: "📍",
      iconBg: "from-sky-400 to-blue-500",
      cardBorder: "border-sky-100",
      title: "📈 Milestone Tracker",
      desc: "Visual age-by-age timeline from 1–6 years. See clearly where your child stands and what to work on next.",
      milestone: true,
      tagColor: "bg-sky-100 text-sky-700",
      onClick: null,
      cta: "Coming soon",
      ctaColor: "text-slate-400",
    },
    {
      icon: <BookOpen size={24} className="text-white" />,
      iconBg: "from-orange-400 to-pink-500",
      cardBorder: "border-orange-100",
      title: "📚 Parenting Guides",
      desc: "Research-backed guides on speech, social skills, sensory needs, motor development, and behaviour. India-specific.",
      tags: ["Speech", "Social", "Motor", "Behaviour"],
      tagColor: "bg-orange-100 text-orange-700",
      onClick: () => navigate("/guides"),
      cta: "Browse 12 guides →",
      ctaColor: "text-orange-600",
    },
  ];

  return (
    <div>
      <div className="text-center mb-14">
        <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black mb-4 border border-purple-200">
          🌟 What NeuroNest Does
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-3">Everything In One Place</h2>
        <p className="text-slate-400 text-lg">Three pillars of early childhood development support</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={card.onClick || undefined}
            className={`bg-white p-7 rounded-3xl shadow-lg border-2 ${card.cardBorder} transition-all duration-300
              ${card.onClick ? "hover:-translate-y-2 hover:shadow-2xl cursor-pointer" : "opacity-80"}`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center mb-5 shadow-md text-2xl`}>
              {typeof card.icon === "string" ? card.icon : card.icon}
            </div>
            <h3 className="font-black text-slate-800 text-xl mb-3">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">{card.desc}</p>

            {card.milestone && (
              <div className="relative flex items-center mt-4 mb-5">
                <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-sky-300 to-purple-400 rounded-full" />
                {ages.map(age => (
                  <div key={age} className="relative flex-1 flex flex-col items-center gap-2 z-10">
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm
                      ${age === 3 ? "w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 shadow-orange-200" :
                        age < 3 ? "bg-gradient-to-br from-sky-400 to-purple-400" : "bg-slate-200"}`} />
                    <span className={`text-[10px] font-black ${age === 3 ? "text-orange-500" : age < 3 ? "text-sky-500" : "text-slate-400"}`}>
                      {age}yr
                    </span>
                  </div>
                ))}
              </div>
            )}

            {card.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {card.tags.map(t => (
                  <span key={t} className={`px-3 py-1 rounded-full text-xs font-black ${card.tagColor}`}>{t}</span>
                ))}
              </div>
            )}

            {card.cta && (
              <p className={`text-sm font-black ${card.ctaColor}`}>{card.cta}</p>
            )}
          </div>
        ))}
      </div>

      {/* How it works strip */}
      <div className="mt-16 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-10 border border-orange-100">
        <h3 className="text-2xl font-black text-slate-800 text-center mb-10">🔍 How NeuroNest Works</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { step: "01", icon: "🎮", title: "Child Plays Games", desc: "3 research-backed games" },
            { step: "02", icon: "📝", title: "Parents Answer", desc: "10 M-CHAT-R questions" },
            { step: "03", icon: "🤖", title: "AI Analyses", desc: "START-based scoring" },
            { step: "04", icon: "📊", title: "You Get Insights", desc: "Domain-wise report" },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md mx-auto mb-3 flex items-center justify-center text-3xl border border-white">
                {s.icon}
              </div>
              <div className="text-xs font-black text-orange-400 mb-1">STEP {s.step}</div>
              <div className="font-black text-slate-700 text-sm mb-1">{s.title}</div>
              <div className="text-xs text-slate-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}