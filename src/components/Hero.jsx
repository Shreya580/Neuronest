/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

      {/* LEFT */}
      <div>
        <h1 className="text-5xl font-bold text-slate-700 mb-4">
          Unlock Your Child's Unique Play Path
        </h1>

        <p className="text-slate-500 text-lg">
          Transform everyday play into actionable developmental insights.
        </p>
      </div>

      {/* RIGHT FLOATING UI */}
      <div className="relative h-80">

        <motion.div
          className="absolute top-0 left-10 bg-white p-6 rounded-3xl shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <p className="text-sm text-slate-400">Fine Motor</p>
          <div className="text-xl font-bold text-slate-700">75%</div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-0 bg-white p-4 rounded-3xl shadow-xl"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <p className="text-sm">Leo mastered "Stacking"</p>
        </motion.div>

      </div>

    </div>
  );
}