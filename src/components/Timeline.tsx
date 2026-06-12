import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { timeline } from "../data";

/* ============================================================
   Timeline.tsx — linha do tempo do casal
   Um card por data, com foto, título, descrição e emoção.
   Navegação anterior/próximo com transição deslizante 3D.
   ============================================================ */

export default function Timeline() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = avançar, -1 = voltar
  const item = timeline[index];

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + timeline.length) % timeline.length);
  };

  /** Variantes de slide com leve rotação 3D */
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
      rotateY: dir > 0 ? 25 : -25,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
      rotateY: dir > 0 ? -25 : 25,
      scale: 0.9,
    }),
  };

  return (
    <section className="flex h-full flex-col px-5 pb-28 pt-14">
      <motion.h2
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow mb-2 text-center font-display text-2xl font-extrabold"
      >
        Linha do tempo ⏳
      </motion.h2>
      <p className="mb-4 text-center text-xs text-white/50">
        Capítulo {index + 1} de {timeline.length}
      </p>

      {/* Área do card com perspectiva para o efeito 3D */}
      <div className="relative flex-1" style={{ perspective: 1000 }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.article
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="wrapped-card absolute inset-0 flex flex-col overflow-hidden p-0"
          >
            {/* Foto do momento */}
            <div className="relative h-1/2 w-full overflow-hidden">
              <img
                src={item.photo}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              {/* Selo de data */}
              <span className="absolute left-4 top-4 rounded-full bg-neon px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-widest text-ink">
                {item.date}
              </span>
            </div>

            {/* Texto */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="font-display text-lg font-extrabold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
              <span className="mt-4 self-start rounded-full border border-neon/40 bg-neon/10 px-4 py-1.5 text-xs font-semibold text-neon">
                {item.emotion}
              </span>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Botões anterior / próximo */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold"
        >
          ← Anterior
        </button>
        {/* Indicadores de posição */}
        <div className="flex gap-1.5">
          {timeline.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-neon" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="rounded-full bg-neon/15 px-6 py-2.5 text-sm font-semibold text-neon"
        >
          Próximo →
        </button>
      </div>
    </section>
  );
}
