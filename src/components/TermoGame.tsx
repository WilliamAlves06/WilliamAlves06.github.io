import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { termo } from "../data";

/* ============================================================
   TermoGame.tsx — mini-game estilo Wordle/Termo
   ------------------------------------------------------------
   • Palavra sorteada da lista personalizada do casal (data.ts)
   • Teclado virtual com feedback colorido
   • Verde  = letra certa no lugar certo
   • Amarelo = letra existe, lugar errado
   • Cinza  = letra não existe
   • Vitória → mensagem romântica | Derrota → revela a palavra
   ============================================================ */

type LetterState = "correct" | "present" | "absent" | "empty";

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

/** Avalia um palpite contra a resposta (algoritmo de 2 passadas,
    tratando corretamente letras repetidas). */
function evaluate(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = Array(answer.length).fill("absent");
  const remaining: Record<string, number> = {};

  // 1ª passada: verdes + contagem das letras restantes
  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) result[i] = "correct";
    else remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1;
  }
  // 2ª passada: amarelos
  for (let i = 0; i < answer.length; i++) {
    if (result[i] === "correct") continue;
    if (remaining[guess[i]] > 0) {
      result[i] = "present";
      remaining[guess[i]]--;
    }
  }
  return result;
}

const stateClass: Record<LetterState, string> = {
  correct: "bg-neon text-ink border-neon",
  present: "bg-gold text-ink border-gold",
  absent: "bg-white/10 text-white/40 border-white/10",
  empty: "bg-transparent text-white border-white/20",
};

export default function TermoGame() {
  /** Palavra do jogo (sorteada uma vez por montagem) */
  const answer = useMemo(
    () => termo.words[Math.floor(Math.random() * termo.words.length)],
    []
  );
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [shake, setShake] = useState(0);

  /** Melhor estado conhecido de cada letra (para pintar o teclado) */
  const keyStates = useMemo(() => {
    const rank = { absent: 1, present: 2, correct: 3 } as const;
    const map: Record<string, LetterState> = {};
    for (const g of guesses) {
      const ev = evaluate(g, answer);
      g.split("").forEach((ch, i) => {
        const s = ev[i];
        if (s === "empty") return;
        if (!map[ch] || rank[s as keyof typeof rank] > rank[map[ch] as keyof typeof rank]) {
          map[ch] = s;
        }
      });
    }
    return map;
  }, [guesses, answer]);

  const press = (key: string) => {
    if (status !== "playing") return;
    if (key === "⌫") return setCurrent((c) => c.slice(0, -1));
    if (key === "ENTER") {
      if (current.length !== answer.length) {
        setShake((s) => s + 1); // animação de erro
        return;
      }
      const next = [...guesses, current];
      setGuesses(next);
      setCurrent("");
      if (current === answer) setStatus("won");
      else if (next.length >= termo.maxTries) setStatus("lost");
      return;
    }
    if (/^[A-Z]$/.test(key) && current.length < answer.length) {
      setCurrent((c) => c + key);
    }
  };

  /** Suporte opcional ao teclado físico (desktop) */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") press("ENTER");
      else if (e.key === "Backspace") press("⌫");
      else press(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <section className="flex h-full flex-col px-4 pb-28 pt-14">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow text-center font-display text-2xl font-extrabold"
      >
        Termo do casal 🟩
      </motion.h2>
      <p className="mb-4 mt-1 text-center text-xs text-white/50">
        Adivinhe a palavra que tem tudo a ver com a gente.
      </p>

      {/* ---------- Grade de tentativas ---------- */}
      <motion.div
        key={shake}
        animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="mx-auto mb-auto grid gap-1.5"
        style={{ gridTemplateRows: `repeat(${termo.maxTries}, 1fr)` }}
      >
        {Array.from({ length: termo.maxTries }).map((_, row) => {
          const guess =
            guesses[row] ?? (row === guesses.length ? current : "");
          const states =
            guesses[row] !== undefined
              ? evaluate(guesses[row], answer)
              : Array(answer.length).fill("empty");
          return (
            <div key={row} className="flex gap-1.5">
              {Array.from({ length: answer.length }).map((_, col) => {
                const letter = guess[col] ?? "";
                const st = states[col] as LetterState;
                return (
                  <motion.div
                    key={col}
                    initial={false}
                    animate={
                      guesses[row] !== undefined
                        ? { rotateX: [90, 0] }
                        : letter
                          ? { scale: [1.15, 1] }
                          : {}
                    }
                    transition={{ delay: guesses[row] !== undefined ? col * 0.12 : 0 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-display text-xl font-extrabold ${stateClass[st]}`}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </motion.div>

      {/* ---------- Mensagem de fim de jogo ---------- */}
      <AnimatePresence>
        {status !== "playing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`wrapped-card my-3 text-center ${
              status === "won" ? "border-neon/50" : "border-rose/50"
            }`}
          >
            <p className="text-3xl">{status === "won" ? "🎉" : "🫶"}</p>
            {status === "lost" && (
              <p className="mt-1 font-display text-sm font-bold text-neon">
                A palavra era: {answer}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              {status === "won" ? termo.winMessage : termo.loseMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Teclado virtual ---------- */}
      <div className="mt-3 space-y-1.5">
        {KEY_ROWS.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {row.map((key) => {
              const st = keyStates[key];
              const wide = key.length > 1;
              return (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => press(key)}
                  className={`flex h-11 items-center justify-center rounded-md text-sm font-bold ${
                    wide ? "px-3 text-[10px]" : "w-[8.6%] min-w-7"
                  } ${
                    st === "correct"
                      ? "bg-neon text-ink"
                      : st === "present"
                        ? "bg-gold text-ink"
                        : st === "absent"
                          ? "bg-white/5 text-white/30"
                          : "bg-white/15 text-white"
                  }`}
                >
                  {key}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
