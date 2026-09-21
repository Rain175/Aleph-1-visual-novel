import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/vnStory";

export default function CharacterSprite({ active }) {
  return (
    <AnimatePresence>
      <motion.div
        key="rain-sprite"
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: 1,
          y: active ? [0, -10, 0] : 0,
          scale: active ? 1.03 : 1,
        }}
        transition={{ duration: active ? 1.8 : 0.7, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 sm:right-4 md:right-12 w-[110vw] max-w-[1100px] pointer-events-none select-none z-10"
        style={{ filter: active ? "drop-shadow(0 0 32px rgba(140,200,255,0.4))" : "none" }}
      >
        <img
          src={ASSETS.rainSprite}
          alt="Rain"
          className="w-full h-auto object-contain object-bottom"
        />
      </motion.div>
    </AnimatePresence>
  );
}