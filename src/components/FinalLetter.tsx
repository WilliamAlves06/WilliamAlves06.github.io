import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, finalLetter } from "../data";

/* ============================================================
   FinalLetter.tsx — carta final
   Envelope animado que, ao ser clicado, se abre revelando a
   carta romântica. Finaliza com o botão "Rever nossa história".
   ============================================================ */

interface Props {
  onRestart: () => void;
}

export default function FinalLetter({ onRestart }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <section className="flex h-full flex-col items-center justify-center px-6 pb-24 pt-14">
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ---------- Envelope fechado ---------- */
          <motion.button
            key="envelope"
            onClick={() => setOpened(true)}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, y: -40 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex flex-col items-center"
            aria-label="Abrir a carta"
          >
            {/* Corpo do envelope */}
            <motion.div
              className="relative h-44 w-64 rounded-xl border border-neon/40 bg-card shadow-neon"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Aba triangular */}
              <div
                className="absolute left-0 top-0 h-0 w-0"
                style={{
                  borderLeft: "128px solid transparent",
                  borderRight: "128px solid transparent",
                  borderTop: "84px solid rgba(29,242,125,0.18)",
                }}
              />
              {/* Lacre de coração pulsando */}
              <motion.span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                💚
              </motion.span>
            </motion.div>
            <p className="mt-6 animate-pulse font-display text-[11px] uppercase tracking-[0.3em] text-neon">
              Toque para abrir 💌
            </p>
          </motion.button>
        ) : (
          /* ---------- Carta aberta ---------- */
          <motion.article
            key="letter"
            initial={{ y: 160, opacity: 0, rotateX: 40 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
            className="no-scrollbar max-h-full w-full overflow-y-auto rounded-2xl border border-neon/20 bg-[#FBF7EE] p-6 text-ink shadow-card"
            style={{ perspective: 800 }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.35 } } }}
            >
              <motion.h3
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mb-4 text-center font-display text-lg font-extrabold text-neonDim"
              >
                {finalLetter.title}
              </motion.h3>

              {finalLetter.paragraphs.map((p) => (
                <motion.p
                  key={p.slice(0, 20)}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  className="mb-4 text-sm leading-relaxed text-ink/85"
                >
                  {p}
                </motion.p>
              ))}

              <motion.p
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="text-right text-sm font-semibold italic text-neonDim"
              >
                {finalLetter.signature}
              </motion.p>

              <motion.p
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mt-2 text-right text-xs text-ink/50"
              >
                {couple.name1} &amp; {couple.name2}
              </motion.p>

              {/* Botão final */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                className="mt-6 flex justify-center"
              >
                <button onClick={onRestart} className="btn-neon px-6 py-3 text-xs">
                  Rever nossa história 🔁
                </button>
              </motion.div>
            </motion.div>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
