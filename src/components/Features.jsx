import { Brain, BookOpen } from "lucide-react";

export default function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-100/50">
        <Brain className="mb-3 text-green-400" />
        <h3 className="font-bold text-slate-700 text-lg">Daily Play Insights</h3>
        <p className="text-slate-500 text-sm mt-2">
          AI-driven analysis of play behavior.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-100/50">
        <h3 className="font-bold text-slate-700 text-lg">Milestone Tracker</h3>

        <div className="flex justify-between mt-6 text-xs text-slate-500">
          {[1,2,3,4,5,6].map(age => (
            <div key={age} className={`flex flex-col items-center ${age === 3 ? "text-red-400 font-bold" : ""}`}>
              <div className="w-3 h-3 rounded-full bg-slate-300 mb-1"></div>
              {age}yr
            </div>
          ))}
        </div>

      </div>

      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-100/50">
        <BookOpen className="mb-3 text-orange-400" />
        <h3 className="font-bold text-slate-700 text-lg">Parenting Guides</h3>

        <div className="flex gap-2 mt-4 text-xs">
          <span className="bg-white px-3 py-1 rounded-full shadow">Speech</span>
          <span className="bg-white px-3 py-1 rounded-full shadow">Social</span>
          <span className="bg-white px-3 py-1 rounded-full shadow">Motor</span>
        </div>

      </div>

    </div>
  );
}