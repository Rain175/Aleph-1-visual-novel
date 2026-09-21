import React, { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ASSETS, PHASES, CORE_ROOM, BIRTHDAY_MESSAGES } from "@/lib/vnStory";
import DialogueBox from "@/components/vn/DialogueBox";
import ChoiceMenu from "@/components/vn/ChoiceMenu";
import CodePuzzle from "@/components/vn/CodePuzzle";
import CharacterSprite from "@/components/vn/CharacterSprite";
import DecryptMessage from "@/components/vn/DecryptMessage";

// stages within a phase
const STAGE = { INTRO: "intro", CHOICE: "choice", PUZZLES: "puzzles", OUTRO: "outro" };

export default function VisualNovel() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [stage, setStage] = useState(STAGE.INTRO);
  const [lineIdx, setLineIdx] = useState(0);
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [ended, setEnded] = useState(false);
  const [coreStage, setCoreStage] = useState("intro"); // intro -> reveal -> messages -> after -> end
  const [coreLineIdx, setCoreLineIdx] = useState(0);
  const audioRef = useRef(null);

  const phase = PHASES[phaseIdx];
  const isCore = phaseIdx >= PHASES.length;

  const currentBeats = useMemo(() => {
    if (isCore) return [];
    return stage === STAGE.INTRO ? phase.introBeats : stage === STAGE.OUTRO ? phase.outroBeats : [];
  }, [phase, stage, isCore]);

  const currentLine = !isCore ? currentBeats[lineIdx] : null;

  // play voice line whenever Rain speaks
  useEffect(() => {
    const line = isCore
      ? (coreStage === "intro" ? CORE_ROOM.reveal.concat()[coreLineIdx] : coreStage === "after" ? CORE_ROOM.after[coreLineIdx] : null)
      : currentLine;
    if (line && line.speaker === "rain") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(ASSETS.rainVoice);
      audioRef.current = audio;
      audio.volume = 0.7;
      audio.play().catch(() => {});
    }
  }, [currentLine, isCore, coreStage, coreLineIdx]);

  const advanceLine = () => {
    if (lineIdx + 1 < currentBeats.length) {
      setLineIdx((i) => i + 1);
    } else {
      // move to next stage
      if (stage === STAGE.INTRO) {
        setStage(STAGE.CHOICE);
      } else if (stage === STAGE.OUTRO) {
        // go to next phase or core room
        if (phaseIdx + 1 < PHASES.length) {
          setPhaseIdx((p) => p + 1);
          setStage(STAGE.INTRO);
          setLineIdx(0);
          setPuzzleIdx(0);
        } else {
          setPhaseIdx((p) => p + 1); // becomes isCore
        }
      }
    }
  };

  const handleChoice = () => {
    setStage(STAGE.PUZZLES);
  };

  const handlePuzzleSolved = () => {
    if (puzzleIdx + 1 < phase.puzzles.length) {
      setPuzzleIdx((i) => i + 1);
    } else {
      setStage(STAGE.OUTRO);
      setLineIdx(0);
    }
  };

  const advanceCore = () => {
    if (coreStage === "intro") {
      if (coreLineIdx + 1 < CORE_ROOM.reveal.length) {
        setCoreLineIdx((i) => i + 1);
      } else {
        setCoreStage("messages");
      }
    } else if (coreStage === "after") {
      if (coreLineIdx + 1 < CORE_ROOM.after.length) {
        setCoreLineIdx((i) => i + 1);
      } else {
        setEnded(true);
      }
    }
  };

  const proceedFromMessages = () => {
    setCoreStage("after");
    setCoreLineIdx(0);
  };

  const background = isCore ? ASSETS.bgCorridorAlarm : phase.background;
  const rainActive = isCore
    ? (coreStage === "intro" && CORE_ROOM.reveal[coreLineIdx]?.speaker === "rain") || (coreStage === "after" && CORE_ROOM.after[coreLineIdx]?.speaker === "rain")
    : currentLine?.speaker === "rain" || stage === STAGE.PUZZLES;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col justify-end">
      <AnimatePresence mode="wait">
        <motion.div
          key={isCore ? "core" : phase.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img src={background} alt="scene" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {!ended && <CharacterSprite active={rainActive} />}

      <div className="relative z-20 w-full px-4 pb-8 sm:pb-12 flex flex-col gap-4">
        {!isCore && (
          <div className="mx-auto w-full max-w-3xl text-center text-white/40 text-[11px] tracking-[0.2em] uppercase mb-1">
            Phase {phase.id} — {phase.title}
          </div>
        )}

        {ended ? (
          <div className="mx-auto w-full max-w-2xl text-center">
            <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-8 py-10 shadow-2xl">
              <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Happy Birthday</h1>
              <p className="text-white/60 font-light">— The End —</p>
            </div>
          </div>
        ) : isCore ? (
          coreStage === "intro" ? (
            <DialogueBox line={CORE_ROOM.reveal[coreLineIdx]} onNext={advanceCore} />
          ) : coreStage === "messages" ? (
            <DecryptMessage messages={BIRTHDAY_MESSAGES} onContinue={proceedFromMessages} />
          ) : (
            <DialogueBox line={CORE_ROOM.after[coreLineIdx]} onNext={advanceCore} />
          )
        ) : stage === STAGE.CHOICE ? (
          <ChoiceMenu choice={phase.choice} onSelect={handleChoice} />
        ) : stage === STAGE.PUZZLES ? (
          <CodePuzzle
            key={phase.puzzles[puzzleIdx].id}
            puzzle={phase.puzzles[puzzleIdx]}
            index={puzzleIdx}
            total={phase.puzzles.length}
            onSolved={handlePuzzleSolved}
          />
        ) : (
          <DialogueBox line={currentLine} onNext={advanceLine} />
        )}
      </div>
    </div>
  );
}