import React from "react";
import { motion } from "framer-motion";

export default function ChoiceMenu({ choice, onSelect }) {
  if (!choice) return null;
  return (
    <div className="relative z-20 mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-6 py-6 shadow-2xl">
        <p className="text-white/70 text-sm mb-4 font-light">{choice.question}</p>
        <div className="flex flex-col gap-2.5">
          {choice.options.map((opt, i) => (
            <motion.button
              key={opt.id}
              onClick={() => onSelect(opt)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="text-left rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-400/10 hover:border-cyan-300/40 transition-colors px-4 py-3 text-white/85 text-sm sm:text-base font-light"
            >
              {opt.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}