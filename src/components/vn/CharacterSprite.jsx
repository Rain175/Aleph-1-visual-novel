import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/vnStory";

// Rain particle component
function RainParticle({ delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 0 }}
      animate={{ opacity: [0, 1, 0], y: 200, x: (Math.random() - 0.5) * 100 }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: Math.random() * 0.5 }}
      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: "-50px",
        filter: "drop-shadow(0 0 4px rgba(34,211,238,0.6))",
      }}
    />
  );
}

export default function CharacterSprite({ active }) {
  const [rainDrops, setRainDrops] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (active && rainDrops.length === 0) {
      setRainDrops(Array.from({ length: 15 }, (_, i) => i));
    }
  }, [active, rainDrops.length]);

  // Play sound effect when character speaks
  useEffect(() => {
    if (active) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current = new Audio(ASSETS.rainVoice);
        audioRef.current.volume = 0.7;
      }
      audioRef.current.play().catch(() => {});
    }
  }, [active]);

  return (
    <AnimatePresence>
      <motion.div
        key="rain-sprite-container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-0 right-0 sm:right-8 md:right-8 w-[70vw] max-w-[500px] pointer-events-none select-none z-10"
      >

        {/* Character sprite */}
        <motion.div
          animate={{
            y: active ? [0, -10, 0] : 0,
            scale: active ? 1.03 : 1,
          }}
          transition={{ duration: active ? 1.8 : 0.7, repeat: active ? Infinity : 0, ease: "easeInOut" }}
          style={{ filter: active ? "drop-shadow(0 0 32px rgba(140,200,255,0.4))" : "none" }}
        >
          <img
            src={ASSETS.rainSprite}
            alt="Rain"
            className="w-full h-auto object-contain object-bottom"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
