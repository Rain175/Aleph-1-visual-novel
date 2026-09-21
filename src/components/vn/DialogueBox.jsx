import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const NAME_STYLES = {
  rain: { label: "Rain", color: "text-cyan-300" },
  player: { label: "You", color: "text-amber-300" },
};

export default function DialogueBox({ line, onNext }) {
  if (!line) return null;
  const meta = NAME_STYLES[line.speaker] || { label: "", color: "text-white" };

  return (
    <div
      onClick={onNext}
      className="relative z-20 mx-auto w-full max-w-3xl cursor-pointer select-none"
    >
      <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-6 py-5 sm:px-8 sm:py-6 shadow-2xl">
        <div className={`text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 ${meta.color}`}>
          {meta.label}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={line.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="text-white/90 text-base sm:text-lg leading-relaxed font-light"
          >
            {line.text}
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-end mt-3 text-white/40 text-xs items-center gap-1">
          continue <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}