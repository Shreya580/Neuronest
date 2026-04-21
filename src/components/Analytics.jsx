
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h2 className="text-2xl font-bold text-slate-700 mb-6">
        Weekly Play Snapshot
      </h2>

      <div className="space-y-4">

        {[
          { label: "Social Sharing", width: "80%" },
          { label: "Problem Solving", width: "60%" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-sm text-slate-500">{item.label}</p>

            <div className="bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-purple-300 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: item.width }}
                transition={{ duration: 1 }}
              />
            </div>

          </div>
        ))}

      </div>

      <div className="mt-10 bg-orange-100 p-6 rounded-3xl">
        <p className="text-slate-700 mb-3">
          Ready for today's adventure?
        </p>

        <button className="bg-orange-400 text-white px-6 py-2 rounded-full">
          Start Activity
        </button>
      </div>

    </div>
  );
}