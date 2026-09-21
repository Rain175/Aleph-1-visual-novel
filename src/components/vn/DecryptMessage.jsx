import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Lock, Unlock } from "lucide-react";

// Decrypted-message popup.
// To edit the birthday message text, open src/lib/vnStory.js and edit the
// BIRTHDAY_MESSAGES array — each entry is { from: "Name", text: "message" }.
export default function DecryptMessage({ messages, onAllRead, onContinue }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [read, setRead] = useState([]);
  const [decrypting, setDecrypting] = useState(false);

  const open = (i) => {
    if (read.includes(i)) {
      setOpenIdx(i);
      return;
    }
    setDecrypting(true);
    setTimeout(() => {
      setRead((r) => (r.includes(i) ? r : [...r, i]));
      setDecrypting(false);
      setOpenIdx(i);
    }, 650);
  };

  const current = openIdx !== null ? messages[openIdx] : null;

  return (
    <div className="relative z-20 mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl px-6 py-6 shadow-2xl">
        <p className="text-white/60 text-sm font-light mb-4">
          Encrypted files found on the terminal. Tap each to decrypt.
        </p>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {messages.map((msg, i) => {
            const isRead = read.includes(i);
            return (
              <button
                key={i}
                onClick={() => open(i)}
                className="flex items-center gap-3 text-left rounded-xl border px-4 py-3 transition-colors border-white/10 bg-white/5 hover:bg-white/10"
              >
                {isRead ? <Unlock className="w-4 h-4 text-cyan-300 shrink-0" /> : <Lock className="w-4 h-4 text-white/40 shrink-0" />}
                <span className={`text-sm font-mono ${isRead ? "text-cyan-200" : "text-white/50"}`}>
                  file_{i + 1}.enc{isRead ? " — decrypted" : " — click to decrypt"}
                </span>
              </button>
            );
          })}
        </div>
        {read.length === messages.length && (
          <button
            onClick={onContinue}
            className="w-full rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-black text-sm font-medium py-2.5 transition-colors"
          >
            Continue
          </button>
        )}
      </div>

      {/* Decrypt popup */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setOpenIdx(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-cyan-300/20 bg-black/90 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
              <Terminal className="w-4 h-4 text-cyan-300" />
              <span className="text-cyan-200 text-xs font-mono tracking-wide">file_{openIdx + 1}.txt</span>
            </div>
            <div className="px-6 py-6">
              {decrypting ? (
                <div className="flex items-center gap-2 text-cyan-300 text-sm font-mono">
                  <span className="inline-block w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
                  decrypting...
                </div>
              ) : current ? (
                <>
                  <div className="text-cyan-300 text-sm font-semibold uppercase tracking-wide mb-3">
                    {current.from}
                  </div>
                  <p className="text-white/90 text-base leading-relaxed font-light whitespace-pre-wrap">
                    {current.text}
                  </p>
                </>
              ) : null}
            </div>
            <div className="px-6 pb-5 flex justify-between items-center">
              <button
                onClick={() => setOpenIdx(null)}
                className="text-white/50 hover:text-white text-xs"
              >
                Close
              </button>
              <div className="flex gap-2">
                {openIdx > 0 && (
                  <button
                    onClick={() => open(openIdx - 1)}
                    className="text-cyan-300 hover:text-cyan-200 text-xs px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    ‹ Prev
                  </button>
                )}
                {openIdx < messages.length - 1 ? (
                  <button
                    onClick={() => open(openIdx + 1)}
                    className="bg-cyan-500/90 hover:bg-cyan-400 text-black text-xs font-medium px-3 py-1.5 rounded-lg"
                  >
                    Next ›
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenIdx(null)}
                    className="bg-cyan-500/90 hover:bg-cyan-400 text-black text-xs font-medium px-3 py-1.5 rounded-lg"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}