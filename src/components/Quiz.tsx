import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quiz, quizMessages } from "../data";

/* ============================================================
   Quiz.tsx — quiz do casal
   Perguntas de múltipla escolha, feedback imediato,
   pontuação final e mensagem baseada no resultado.
   ============================================================ */

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = quiz[index];

  /** Mensagem final conforme % de acertos */
  const finalMessage = () => {
    const pct = score / quiz.length;
    if (pct === 1) return quizMessages.perfect;
    if (pct >= 0.7) return quizMessages.good;
    if (pct >= 0.4) return quizMessages.ok;
    return quizMessages.low;
  };

  const choose = (i: number) => {
    if (selected !== null) return; // já respondeu
    setSelected(i);
    if (i === question.answerIndex) setScore((s) => s + 1);
    // Avança automaticamente após o feedback
    setTimeout(() => {
      if (index + 1 < quiz.length) {
        setIndex((x) => x + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1100);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  /* ---------- Tela de resultado ---------- */
  if (finished) {
    return (
      <section className="flex h-full flex-col items-center justify-center px-6 pb-24 pt-14 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="wrapped-card w-full border-neon/40"
        >
          <p className="text-5xl">🏆</p>
          <p className="mt-3 font-display text-[10px] uppercase tracking-[0.3em] text-white/50">
            Sua pontuação
          </p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="glow my-2 font-display text-6xl font-extrabold text-neon"
          >
            {score}/{quiz.length}
          </motion.p>
          <p className="text-sm leading-relaxed text-white/85">{finalMessage()}</p>
          <button onClick={restart} className="btn-neon mt-6 px-6 py-3 text-xs">
            Jogar de novo
          </button>
        </motion.div>
      </section>
    );
  }

  /* ---------- Pergunta atual ---------- */
  return (
    <section className="flex h-full flex-col px-5 pb-28 pt-14">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow text-center font-display text-2xl font-extrabold"
      >
        Quiz do casal ❓
      </motion.h2>
      <p className="mb-5 mt-1 text-center text-xs text-white/50">
        Pergunta {index + 1} de {quiz.length} · {score} acerto(s)
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
          className="flex flex-1 flex-col"
        >
          <div className="wrapped-card mb-5">
            <p className="font-display text-base font-bold leading-snug">
              {question.question}
            </p>
          </div>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const isAnswer = i === question.answerIndex;
              const isChosen = selected === i;
              const revealed = selected !== null;
              return (
                <motion.button
                  key={opt}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => choose(i)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-colors ${
                    revealed && isAnswer
                      ? "border-neon bg-neon/15 text-neon"
                      : revealed && isChosen
                        ? "border-rose bg-rose/15 text-rose"
                        : "border-white/10 bg-card text-white/85"
                  }`}
                >
                  <span className="mr-2 font-display text-xs text-white/40">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                  {revealed && isAnswer && " ✓"}
                  {revealed && isChosen && !isAnswer && " ✗"}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
