import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Check } from "lucide-react";

export default function CodePuzzle({ puzzle, index, total, onSolved }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);
  const [running, setRunning] = useState(false);

  const submit = () => {
    if (running || solved) return;
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      const normalized = value.trim().toLowerCase();
      const ok = puzzle.answers.some((a) => a.trim().toLowerCase() === normalized);
      if (ok) {
        setSolved(true);
        setError(false);
        setTimeout(() => onSolved(), 550);
      } else {
        setError(true);
        setTimeout(() => setError(false), 500);
      }
    }, 700);
  };

  return (
    <div className="relative z-20 mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-cyan-400/20 bg-black/75 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            Terminal {index + 1} / {total}
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-200 tracking-wide">
            {puzzle.language}
          </span>
        </div>

        <div className="px-5 py-4">
          <p className="text-white/60 text-sm font-light mb-3">{puzzle.context}</p>

          <pre className="rounded-lg bg-black/60 border border-white/10 p-4 text-[13px] sm:text-sm overflow-x-auto text-emerald-200 font-mono whitespace-pre-wrap">
{puzzle.codeBefore}<motion.span
              animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              className={`inline-block min-w-[2.5ch] px-1 rounded ${
                solved ? "bg-emerald-500/30 text-emerald-200" : error ? "bg-red-500/30 text-red-200" : "bg-cyan-400/20 text-cyan-100"
              }`}
            >
              {value || "____"}
            </motion.span>{puzzle.codeAfter}
          </pre>

          {!solved ? (
            <div className="mt-4 flex gap-2">
              <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Enter the missing code..."
                className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-cyan-300/50"
              />
              <button
                onClick={submit}
                disabled={running}
                className="rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-black text-sm font-medium px-4 py-2 transition-colors disabled:opacity-60"
              >
                {running ? "Running..." : "Run"}
              </button>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-emerald-300 text-sm font-medium">
              <Check className="w-4 h-4" /> Terminal bypassed
            </div>
          )}

          {error && !solved && (
            <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300 text-xs font-mono">
              SyntaxError: unexpected token — check your input and try again.
            </div>
          )}
          {running && !solved && (
            <div className="mt-3 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-cyan-200 text-xs font-mono">
              <span className="inline-block w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse mr-2 align-middle" />
              executing script...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}